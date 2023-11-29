const express = require('express');
const bodyParser = require('body-parser');
const ps4Router = require('./ps4');

const app = express();

// Parse incoming request bodies in a middleware before your handlers
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Mount the ps4Router on the '/ps4' path
app.use('/ps4', ps4Router);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000/');
});
