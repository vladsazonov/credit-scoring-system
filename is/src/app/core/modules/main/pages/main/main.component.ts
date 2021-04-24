import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Logout } from 'app/core/state/auth-state/auth.actions';

import { DEFAULT_CLIENT_FORM_DATA } from 'lib/constants';
import { IResultData } from 'lib/interfaces';

import { Store } from '@ngxs/store';

import { startWith } from 'rxjs/operators';

import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public resultData: IResultData;

  public defaultClient = {
    id: 0,
    name: 'Новый клиент'
  };

  public clients = [
    { id: 1, name: 'lol', info: { name: 'lol' } },
    { id: 2, name: 'kek', info: { name: 'kek' } }
  ];

  public readonly defaultClientFormData = DEFAULT_CLIENT_FORM_DATA;

  constructor(private store: Store, private router: Router, private formBuilder: FormBuilder) {}

  public ngOnInit() {
    this.createForm();
  }

  public ngOnDestroy() {}

  private createForm() {
    this.form = this.formBuilder.group({
      // Revenues/expenses and property
      salary: null,
      spouseSalary: null,
      otherRevenues: null,
      totalPropertyCost: null,
      totalCarCost: null,
      mandatoryPayments: null,

      // Employment
      totalWorkExperience: null,
      numberOfPositions: null,
      occupation: null,
      position: '',
      jobType: null,
      workExperience: null,

      // Personal information
      name: '',
      dateOfBirth: '',
      sex: '',
      familyStatus: [null, Validators.required],
      childrenCount: null,
      citizenship: '',
      city: '',
      education: '',
      lengthOfStay: null,

      // Credit info
      loanRepayments: null,
      activeLoans: null,

      // Additional info
      earlyPayment: null,
      currentBankLoans: null,
      guarantorsAvailability: null,
      debts: null,

      // Loan data
      sum: [null, Validators.required],
      term: [null, Validators.required],
      interestRate: [null, Validators.required],
      livingWage: [null, Validators.required],

      clientId: 0
    });

    this.form
      .get('clientId')
      .valueChanges.pipe(untilDestroyed(this), startWith(this.form.get('clientId').value))
      .subscribe(value => {
        const clientInfo = this.clients.find(item => item.id === value)?.info;

        if (value === 0) {
          this.form.patchValue(this.defaultClientFormData);
        } else if (clientInfo) {
          this.form.patchValue({
            name: clientInfo.name
          });
        }
      });
  }

  public onClearForm(fields) {
    this.form.patchValue(fields);

    this.resultData = {};
  }

  public onLogout() {
    this.store.dispatch(new Logout()).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  public onCalculateRating() {
    const {
      livingWage,
      childrenCount,
      salary,
      mandatoryPayments,
      otherRevenues,
      term,
      interestRate,
      earlyPayment,
      currentBankLoans,
      guarantorsAvailability,
      debts,
      totalWorkExperience,
      numberOfPositions,
      occupation,
      jobType,
      workExperience,
      familyStatus
    } = this.form.value;

    const calcLivingWage = (livingWage || 0) + (childrenCount || 0);
    const calcNetIncome = (salary || 0) * 0.87 - (mandatoryPayments || 0) - calcLivingWage + (otherRevenues || 0);
    const calcSolvency = calcNetIncome * 0.6 + (term || 0);

    let calcMaxCredit = 0;
    let score =
      (earlyPayment || 0) +
      (currentBankLoans || 0) +
      (guarantorsAvailability || 0) +
      (debts || 0) +
      (totalWorkExperience || 0) * 1.5 +
      (occupation || 0) +
      (numberOfPositions || 0) * 0.4 +
      (jobType || 0) +
      (workExperience || 0) +
      (familyStatus || 0);

    if (calcSolvency > 0) {
      calcMaxCredit = calcSolvency / (1 + (((term || 0) + 1) * (interestRate || 0)) / 2400);
      score += 1;
    }

    this.resultData = { calcLivingWage, calcNetIncome, calcSolvency, calcMaxCredit, interestRate, score };
  }
}
