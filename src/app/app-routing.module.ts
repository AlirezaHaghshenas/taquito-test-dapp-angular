import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { TestsComponent } from './tests/tests.component';

const routes: Routes = [
  {
    path: 'connect',
    component: ConnectComponent,
  },
  {
    path: 'tests',
    component: TestsComponent,
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
