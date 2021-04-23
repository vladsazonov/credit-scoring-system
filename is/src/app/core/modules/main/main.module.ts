import { NgModule } from '@angular/core';

import { AuthState } from 'app/core/state/auth-state/auth.state';

import { NgxsModule } from '@ngxs/store';

import { MainPageComponent } from './pages/main/main.component';

import { ClientFormComponent } from './components';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { ResultFormComponent } from './components/result-form/result-form.component';

import { SharedModule } from '../../shared/shared.module';

import { MainRoutingModule } from './main-routing.module';

@NgModule({
  imports: [SharedModule, MainRoutingModule, NgxsModule.forFeature([AuthState])],
  declarations: [MainPageComponent, ClientFormComponent, LoanFormComponent, ResultFormComponent]
})
export class MainModule {}
