const express = require('express');
const router = express.Router();
const { API_ENDPOINT, API_KEY } = require('./config');
const fetch = require('node-fetch');
const redis = require('redis');

// Create and connect the Redis client
const redisClient = redis.createClient();
redisClient.connect();

// Middleware to check cache
async function checkCache(req, res, next) {
    const { searchTerm } = req.body;

    try {
        const cachedData = await redisClient.get(searchTerm);
        if (cachedData != null) {
            return res.json({ data: JSON.parse(cachedData), source: 'cache' });
        }
        next();
    } catch (err) {
        console.error(err);
        next();
    }
}

router.post('/promise', checkCache, async (req, res) => {
    const searchTerm = req.body.searchTerm;

    try {
        const response = await fetch(`${API_ENDPOINT}/v1/search?q=${searchTerm}&type=track&limit=1`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        const data = await response.json();

        // Cache the response with a 15-second timeout
        await redisClient.set(searchTerm, JSON.stringify(data), {
            EX: 15 // sets the expiry time in seconds
        });

        res.json({ data: data, source: 'API' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
