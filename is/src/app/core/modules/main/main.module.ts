import { NgModule } from '@angular/core';

import { AuthState } from 'app/core/state/auth-state/auth.state';

import { NgxsModule } from '@ngxs/store';

import { MainPageComponent } from './pages/main/main.component';

import { ClientFormComponent } from './components';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { ResultFormComponent } from './components/result-form/result-form.component';

import { SharedModule } from '../../shared/shared.module';
import { SolvencyRatioPipe } from './shared/pipes';
import { MainPipesModule } from './shared/pipes/main-pipes.module';

import { MainRoutingModule } from './main-routing.module';

@NgModule({
  imports: [SharedModule, MainRoutingModule, NgxsModule.forFeature([AuthState]), MainPipesModule],
  declarations: [MainPageComponent, ClientFormComponent, LoanFormComponent, ResultFormComponent],
  providers: [SolvencyRatioPipe]
})
export class MainModule {}
