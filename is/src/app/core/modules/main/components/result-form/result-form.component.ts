import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-result-form',
  templateUrl: 'result-form.component.html',
  styleUrls: ['result-form.component.scss']
})
export class ResultFormComponent implements OnInit {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit() {}

  public clearClientForm() {
    this.form.reset();
  }
}
