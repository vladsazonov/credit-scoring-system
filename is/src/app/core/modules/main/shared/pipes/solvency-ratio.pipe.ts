import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'solvencyRatio'
})
export class SolvencyRatioPipe implements PipeTransform {
  public transform(ratio: number): string {
    if (!ratio || ratio < 0) {
      return 'Неудовлетворительный';
    }
    if (ratio < 1000) {
      return 'Крайне низкий';
    }
    if (ratio < 6000) {
      return 'Низкий';
    }
    if (ratio < 11000) {
      return 'Средний';
    }
    if (ratio <= 50000) {
      return 'Высокий';
    }
    if (ratio > 50000) {
      return 'Крайне высокий';
    }
  }
}
