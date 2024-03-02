import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/@shared/shared.module';
import {
  EditProfileComponent,
  UserProfileComponent,
  UserShellContainerComponent,
} from '.';

@NgModule({
  declarations: [
    EditProfileComponent,
    UserProfileComponent,
    UserShellContainerComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
