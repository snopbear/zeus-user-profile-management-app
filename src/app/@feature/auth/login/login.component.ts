import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {
  UserService,
  LocalStorageService,
  PageTitleService,
  ValidationService,
} from '@services/index';
import { IUser } from '@models/index';

@Component({
  selector: 'zeus-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //#region service initialization
  _router = inject(Router);

  _formBuilder = inject(FormBuilder);

  _userService = inject(UserService);

  _localStorageService = inject(LocalStorageService);

  _pageTitleService = inject(PageTitleService);

  _validationService = inject(ValidationService);

  //#endregion

  //#region observable & stream initialization
  _users$!: Observable<IUser[]>;
  //#endregion

  //#region variables declearning
  _userFormGroup!: FormGroup;

  _formErrors = {} as any;

  _validationMessages: any = {
    id: {
      required: 'name is required.',
    },
    password: {
      required: 'password is required.',
    },
  };
  //#endregion

  //#region private utilities
  logValidationErrors() {
    this._formErrors = this._validationService.getValidationErrors(
      this._userFormGroup,
      this._validationMessages
    );
  }

  trackByFn(index: number, item: IUser): string {
    return item.id; // Assuming `id` is a unique identifier for your items
  }
  //#endregion

  //#region constructor
  constructor() {
    this._users$ = this._userService.getUsers();

    this._userFormGroup = this._formBuilder.group({
      id: ['', Validators.required],
      password: ['password', [Validators.required]],
    });
  }
  //#endregion

  //#region life cycle hooks
  ngOnInit(): void {
    this._pageTitleService.setPageTitle(
      'Login - Zeus Profile Managment Application'
    );
  }
  //#endregion

  //#region methods
  login(): void {
    if (this._userFormGroup?.valid) {
      this._localStorageService.setItem(
        environment.zeus_user_id,
        this._userFormGroup.value.id
      );
      this._router.navigate(['/user/profile']);
    }
  }
  createUser(): void {
    this._router.navigate(['/user/edit-profile/0']);
  }
  //#endregion
}
