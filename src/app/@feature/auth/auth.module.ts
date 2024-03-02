import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthShellContainerComponent, LoginComponent } from './index';
import { SharedModule } from 'src/app/@shared/shared.module';


@NgModule({
  declarations: [AuthShellContainerComponent, LoginComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
