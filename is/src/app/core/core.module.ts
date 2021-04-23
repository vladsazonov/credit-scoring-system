import { NgModule } from '@angular/core';

import { environment } from 'environments/environment';

import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';

import { AuthState } from './state/auth-state/auth.state';

import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    NgxsModule.forRoot([AuthState], { developmentMode: !environment.production }),
    NgxsStoragePluginModule.forRoot({
      key: ['auth']
    }),
    NgxsRouterPluginModule.forRoot()
  ],
  providers: [AuthService]
})
export class CoreModule {}
