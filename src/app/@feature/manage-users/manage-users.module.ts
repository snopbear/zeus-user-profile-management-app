import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListUsersComponent } from './list-users/list-users.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { ManageUsersContainerComponent } from './manage-users-container/manage-users-container.component';
import { SharedModule } from 'src/app/@shared/shared.module';


@NgModule({
  declarations: [ManageUsersContainerComponent,ListUsersComponent,CreateUsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    ManageUsersRoutingModule
  ]
})
export class ManageUsersModule { }
