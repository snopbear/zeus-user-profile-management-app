import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent, UserProfileComponent, UserShellContainerComponent } from '.';


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
