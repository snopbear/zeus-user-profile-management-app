import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { ManageUsersContainerComponent } from './manage-users-container/manage-users-container.component';


const routes: Routes = [
  { path: '', redirectTo: 'list-users', pathMatch: 'full' },
  {
    path: '',
    component: ManageUsersContainerComponent,
    children: [
      { path: 'list-users', component: ListUsersComponent },
      { path: 'create-users', component: CreateUsersComponent },
      { path: 'edit-users/:id', component: CreateUsersComponent },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
