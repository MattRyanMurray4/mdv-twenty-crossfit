import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Box } from '@crossfit/api-interfaces';

@Component({
  selector: 'crossfit-box-details',
  templateUrl: './box-details.component.html',
  styleUrls: ['./box-details.component.scss'],
})
export class BoxDetailsComponent {
  currentBox: Box;
  originalName: string;

  @Input() set box(value: Box | null) {
    if (value) this.originalName = value.name;
    this.currentBox = Object.assign({}, value);
  }

  @Input() form: FormGroup;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  save(box: Box) {
    this.saved.emit(box);
  }

  cancel() {
    this.cancelled.emit();
  }

  saveForm(formDirective: FormGroupDirective) {
    if (formDirective.invalid) return;
    this.saved.emit(formDirective.value);
    formDirective.resetForm();
  }
}
