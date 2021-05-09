import { NgModule } from '@angular/core';

import { SolvencyRatioPipe } from './solvency-ratio.pipe';

const PIPES = [SolvencyRatioPipe];
@NgModule({
  exports: [SolvencyRatioPipe],
  declarations: [SolvencyRatioPipe],
  providers: [SolvencyRatioPipe]
})
export class MainPipesModule {}
