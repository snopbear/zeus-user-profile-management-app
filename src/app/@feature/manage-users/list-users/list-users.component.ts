import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserManagers } from '@models/interfaces/user-managers/user-managers';
import { UserManagersService } from '@services/custom/user-managers/user-managers.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  userManagers!: IUserManagers[];
  constructor(
    private _userManagersService: UserManagersService,
    private _router: Router
  ) {}

  ngOnInit() {
    this._userManagersService.getUserManagers().subscribe({
      next: (response) => {
        debugger;
        this.userManagers = response;
      },
      error: (error) => {
        // treat error
      },
      complete: () => {
        // define on request complete logic
        // 'complete' is not the same as 'finalize'!!
        // this logic will not be executed if error is fired
      },
    });
  }

  edit(id: any) {
    this._router.navigate(['/manage-user/edit-users', id]);
  }
}
