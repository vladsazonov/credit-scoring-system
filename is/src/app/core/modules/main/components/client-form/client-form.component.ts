import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

import {
  DEFAULT_CLIENT_FORM_DATA,
  EDUCATION_LEVELS,
  FAMILY_STATUSES,
  JOB_TYPES,
  OCCUPATIONS,
  SEX,
  WORK_EXPERIENCES,
} from 'lib/constants';
import { isFormInvalid, markAllFieldsAsTouched } from 'lib/utils';

@Component({
  selector: 'app-client-form',
  templateUrl: 'client-form.component.html',
  styleUrls: ['client-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClientFormComponent implements OnInit {
  @Input() public form: FormGroup;

  @Output() public clearClientForm = new EventEmitter();

  public readonly occupations = OCCUPATIONS;
  public readonly jobTypes = JOB_TYPES;
  public readonly workExperiences = WORK_EXPERIENCES;
  public readonly sex = SEX;
  public readonly familyStatuses = FAMILY_STATUSES;
  public readonly educationLevels = EDUCATION_LEVELS;
  public readonly defaultClientFormData = DEFAULT_CLIENT_FORM_DATA;

  constructor() {}

  public ngOnInit() {}

  public handleCheck(event, field) {
    console.log(event);

    this.form.get(field).setValue(event.checked ? event.source.value : 0);
  }

  public onSubmit() {
    markAllFieldsAsTouched(this.form);

    if (isFormInvalid(this.form)) {
      return;
    }
  }
}
