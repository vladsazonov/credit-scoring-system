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

  public application: string;

  constructor() {}

  public ngOnInit() {}

  public createApplication() {
    this.application = this.getRandomIntInclusive(100, 10000000);
  }

  private getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
  }
}
