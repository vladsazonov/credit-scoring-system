import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { IResultData } from 'lib/interfaces';

@Component({
  selector: 'app-result-form',
  templateUrl: 'result-form.component.html',
  styleUrls: ['result-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultFormComponent implements OnInit {
  @Input() public resultData: IResultData;

  constructor() {}

  public ngOnInit() {}
}
