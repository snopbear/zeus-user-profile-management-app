import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserShellContainerComponent } from './user-shell-container/user-shell-container.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  {
    path: '',
    component: UserShellContainerComponent,
    children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'edit-profile/:id', component: EditProfileComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
