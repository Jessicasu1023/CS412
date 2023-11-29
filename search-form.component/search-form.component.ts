// search-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html'
})
export class SearchFormComponent {
  @Output() queryEvent = new EventEmitter<string>();

  searchForm = this.fb.group({
    searchTerm: ['', [Validators.required, Validators.minLength(2)]]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.searchForm.valid) {
      this.queryEvent.emit(this.searchForm.value.searchTerm);
    }
  }
}
