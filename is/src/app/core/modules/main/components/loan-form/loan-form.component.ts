import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { isFormInvalid, markAllFieldsAsTouched } from 'lib/utils';

@Component({
  selector: 'app-loan-form',
  templateUrl: 'loan-form.component.html',
  styleUrls: ['loan-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoanFormComponent implements OnInit {
  @Input() public form: FormGroup;

  @Output() public clearLoanForm = new EventEmitter();
  @Output() public calculateRating = new EventEmitter();

  public defaultFormData = {
    sum: null,
    term: null,
    interestRate: null,
    livingWage: null
  };

  constructor() {}

  public ngOnInit() {}

  public onSubmit() {
    markAllFieldsAsTouched(this.form);

    if (isFormInvalid(this.form)) {
      return;
    }

    this.calculateRating.emit();
  }
}
