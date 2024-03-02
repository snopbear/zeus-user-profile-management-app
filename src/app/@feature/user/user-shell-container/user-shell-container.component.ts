import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@services/index';

@Component({
  selector: 'zeus-user-shell-container',
  templateUrl: './user-shell-container.component.html',
  styleUrls: ['./user-shell-container.component.css'],
})
export class UserShellContainerComponent  {
  //#region service initialization

  router = inject(Router);
  localStorageService = inject(LocalStorageService);

  //#endregion service initialization

  constructor() {}

  logout(): void {
    this.localStorageService.clearStorage();
    this.router.navigate(['/auth/login']);
  }
}
