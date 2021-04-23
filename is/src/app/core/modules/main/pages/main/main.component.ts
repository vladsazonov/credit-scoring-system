import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Logout } from 'app/core/state/auth-state/auth.actions';

import { Store } from '@ngxs/store';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;

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
      occupation: '',
      position: '',
      jobType: '',
      workExperience: null,

      // Personal information
      name: '',
      dateOfBirth: '',
      sex: '',
      familyStatus: '',
      childrenCount: null,
      citizenship: '',
      city: '',
      education: '',
      lengthOfStay: null,

      // Credit info
      loanRepayments: null,
      activeLoans: null,

      // Additional info
      earlyPayment: false,
      currentBankLoans: false,
      guarantorsAvailability: false,
      debts: false,

      // Loan data
      sum: null,
      term: null,
      interestRate: null,
      livingWage: null
    });
  }

  public onClearClientForm(fields) {
    this.form.patchValue(fields);
  }

  public onLogout() {
    this.store.dispatch(new Logout()).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  // public onCalculateRating() {
  //   let NewLivingWage = +this.state.livingWage * +this.state.familyMembers;
  //   let NewNetIncome = +this.state.salary * 0.87 - +this.state.communalPayments -
  //       NewLivingWage + +this.state.additionalIncome;
  //   let NewSolvency = (NewNetIncome * 0.6) * +this.state.month;
  //   let NewMaxCredit;
  //   let scoreSumm = +this.state.marriage + +this.state.position + +this.state.property +
  //       +this.state.car +
  //       +this.state.debt + +this.state.education + +this.state.citizenship + +this.state.existingLoans;

  //   if (NewSolvency > 0) {
  //       NewMaxCredit = NewSolvency / (1 + (+this.state.month + 1) * +this.state.creditPercent / 2400);
  //       scoreSumm += 1;

  //   } else {
  //       NewMaxCredit = 0;
  //   }

  // }
}
