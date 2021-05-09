import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { GetClients } from 'app/core/state/auth-state/auth.actions';

import { IClient } from 'lib/interfaces';

import { Store } from '@ngxs/store';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MainPageResolver implements Resolve<IClient[]> {
  constructor(private store: Store) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IClient[]> | Promise<IClient[]> | IClient[] {
    return this.store.dispatch(new GetClients());
  }
}
