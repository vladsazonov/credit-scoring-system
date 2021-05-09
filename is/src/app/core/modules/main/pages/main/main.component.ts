import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Logout } from 'app/core/state/auth-state/auth.actions';
import { AuthState } from 'app/core/state/auth-state/auth.state';

import {
  DEFAULT_CLIENT_FORM_DATA,
  EDUCATION_LEVELS,
  FAMILY_STATUSES,
  JOB_TYPES,
  OCCUPATIONS,
  SEX,
  WORK_EXPERIENCES,
} from 'lib/constants';
import { IClient, IResultData } from 'lib/interfaces';

import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  @Select(AuthState.clients) public clients$: Observable<IClient[]>;

  public form: FormGroup;
  public resultData: IResultData;
  public clients: IClient[];

  public defaultClient = {
    id: 0,
    name: 'Новый клиент'
  };

  public readonly occupations = OCCUPATIONS;
  public readonly jobTypes = JOB_TYPES;
  public readonly workExperiences = WORK_EXPERIENCES;
  public readonly sex = SEX;
  public readonly familyStatuses = FAMILY_STATUSES;
  public readonly educationLevels = EDUCATION_LEVELS;
  public readonly defaultClientFormData = DEFAULT_CLIENT_FORM_DATA;

  constructor(private store: Store, private router: Router, private formBuilder: FormBuilder) {}

  public ngOnInit() {
    this.clients$.pipe(untilDestroyed(this)).subscribe(value => (this.clients = value));
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
      dateOfBirth: null,
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

        this.form.patchValue(this.defaultClientFormData);

        if (clientInfo) {
          const formData = {
            ...clientInfo
            // ...(clientInfo.dateOfBirth && { dateOfBirth: Date.parse(clientInfo.dateOfBirth) })
          };

          // Object.keys(clientInfo).forEach(filed =>
          //   this.form.get(filed).setValue(clientInfo[filed]?.name || clientInfo[filed])
          // );

          this.form.patchValue({
            ...formData
          });
        }
      });
  }

  public onClearForm(fields) {
    this.form.patchValue(fields);

    this.resultData = null;
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
      familyStatus,
      education,
      lengthOfStay,
      loanRepayments,
      activeLoans
    } = this.form.value;

    const calcLivingWage = (livingWage || 0) * (childrenCount || 1);
    const calcNetIncome = (salary || 0) * 0.87 - (mandatoryPayments || 0) - calcLivingWage + (otherRevenues || 0);
    const calcSolvency = calcNetIncome * 0.6 * (term || 0);

    let calcMaxCredit = 0;
    let score =
      (earlyPayment || 0) +
      (currentBankLoans || 0) +
      (guarantorsAvailability || 0) +
      (debts || 0) +
      (totalWorkExperience || 0) * 1.5 +
      (this.getCoefficient('occupation', occupation) || 0) +
      (numberOfPositions || 0) * 0.4 +
      (this.getCoefficient('jobType', jobType) || 0) +
      (this.getCoefficient('workExperience', workExperience) || 0) +
      (this.getCoefficient('familyStatus', familyStatus) || 0) +
      (this.getCoefficient('education', education) || 0) +
      (lengthOfStay || 1) * 0.8 +
      (loanRepayments || 0) * 10 +
      (activeLoans || 0) * 3.1;

    if (calcSolvency > 0) {
      calcMaxCredit = calcSolvency / (1 + (((term || 0) + 1) * (interestRate || 0)) / 2400);
      score += 1;
    }

    this.resultData = { calcLivingWage, calcNetIncome, calcSolvency, calcMaxCredit, interestRate, score };
  }

  private getCoefficient(field, id): number {
    switch (field) {
      case 'occupation': {
        return this.occupations.find(item => item.id === id)?.coefficient;
      }

      case 'jobType': {
        return this.jobTypes.find(item => item.id === id)?.coefficient;
      }

      case 'workExperience': {
        return this.workExperiences.find(item => item.id === id)?.coefficient;
      }

      case 'familyStatus': {
        return this.familyStatuses.find(item => item.id === id)?.coefficient;
      }

      case 'education': {
        return this.educationLevels.find(item => item.id === id)?.coefficient;
      }

      default:
        return null;
    }
  }
}
