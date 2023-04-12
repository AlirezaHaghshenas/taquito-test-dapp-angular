import { Injectable, NgModule } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { TestsComponent } from './tests/tests.component';
import { TezosService } from './services/tezos.service';

@Injectable()
export class ConnectedGuard implements CanActivate {
  constructor(private tezos: TezosService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.tezos.connectionInfo !== undefined;
  }
}

@Injectable()
export class DisconnectedGuard implements CanActivate {
  constructor(private tezos: TezosService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.tezos.connectionInfo === undefined;
  }
}

const routes: Routes = [
  {
    path: 'connect',
    component: ConnectComponent,
    canActivate: [DisconnectedGuard],
  },
  {
    path: 'tests',
    component: TestsComponent,
    canActivate: [ConnectedGuard],
  },
  {
    path: '**',
    redirectTo: 'connect',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
