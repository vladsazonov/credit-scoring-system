import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { EDUCATION_LEVELS, FAMILY_STATUSES, JOB_TYPES, OCCUPATIONS, SEX, WORK_EXPERIENCES } from 'lib/constants';

@Component({
  selector: 'app-client-form',
  templateUrl: 'client-form.component.html',
  styleUrls: ['client-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientFormComponent implements OnInit {
  @Input() public form: FormGroup;

  @Output() public clearClientForm = new EventEmitter();

  public defaultFormData = {
    salary: null,
    spouseSalary: null,
    otherRevenues: null,
    totalPropertyCost: null,
    totalCarCost: null,
    mandatoryPayments: null,
    totalWorkExperience: null,
    numberOfPositions: null,
    occupation: '',
    position: '',
    jobType: '',
    workExperience: null,
    name: '',
    dateOfBirth: '',
    sex: '',
    familyStatus: '',
    childrenCount: null,
    citizenship: '',
    city: '',
    education: '',
    lengthOfStay: null,
    loanRepayments: null,
    activeLoans: null,
    earlyPayment: false,
    currentBankLoans: false,
    guarantorsAvailability: false,
    debts: false
  };

  public readonly occupations = OCCUPATIONS;
  public readonly jobTypes = JOB_TYPES;
  public readonly workExperiences = WORK_EXPERIENCES;
  public readonly sex = SEX;
  public readonly familyStatuses = FAMILY_STATUSES;
  public readonly educationLevels = EDUCATION_LEVELS;

  constructor() {}

  public ngOnInit() {}
}
