import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserShellContainerComponent } from './user-shell-container/user-shell-container.component';
import { SharedModule } from 'src/app/@shared/shared.module';


@NgModule({
  declarations: [
    EditProfileComponent,
    UserProfileComponent,
    UserShellContainerComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,SharedModule
  ]
})
export class UserModule { }
