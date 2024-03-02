import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthShellContainerComponent, LoginComponent } from '.';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthShellContainerComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
