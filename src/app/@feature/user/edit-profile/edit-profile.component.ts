import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '@models/index';
import {
  LocalStorageService,
  PageTitleService,
  UnsubscriberService,
  UserService,
  ValidationService,
} from '@services/index';
import { EMPTY, Subject, catchError, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'zeus-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [UnsubscriberService],
})
export class EditProfileComponent implements OnInit {
  //#region service initialization
  _router = inject(Router);

  _route = inject(ActivatedRoute);

  _unsubscriberService = inject(UnsubscriberService);

  _formBuilder = inject(FormBuilder);

  _userService = inject(UserService);

  _localStorageService = inject(LocalStorageService);

  _pageTitleService = inject(PageTitleService);

  _validationService = inject(ValidationService);

  //#endregion

  //#region observable & stream initialization
  private _errorMessageSubject = new Subject<string>();

  _errorMessage$ = this._errorMessageSubject.asObservable();
  //#endregion

  //#region variables declearning
  _userModal = <IUser>{};

  _userFormGroup!: FormGroup;

  _formErrors = {} as any;

  _validationMessages: any = {
    name: {
      required: 'name is required.',
    },
    email: {
      required: 'email is required.',
      email: 'email domain is missing.',
    },
    bio: {
      required: 'bio is required.',
    },
  };

  _userId!: string;

  //#endregion

  //#region methods initialization
  logValidationErrors() {
    this._formErrors = this._validationService.getValidationErrors(
      this._userFormGroup,
      this._validationMessages
    );
  }
  //#endregion

  //#region constructor
  constructor() {
    this._userFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: ['', [Validators.required]],
    });
  }
  //#endregion

  //#region life cycle hooks
  ngOnInit(): void {
    this._route.params
      .pipe(takeUntil(this._unsubscriberService.destroy$))
      .subscribe((params) => {
        this._userId = params['id'];
        if (this._userId == '0') {
          this._pageTitleService.setPageTitle(
            'Create - Zeus Profile Managment Application'
          );
        } else {
          this._pageTitleService.setPageTitle(
            'Update - Zeus Profile Managment Application'
          );
          this.mapingUser();
        }
      });
  }
  //#endregion

  //#region methods

  submitUser(): void {
    this._userId == '0' ? this.addUser() : this.updateUser();
  }

  addUser() {
    // bind user modal
    this._userModal.name = this._userFormGroup.value.name;
    this._userModal.email = this._userFormGroup.value.email;
    this._userModal.bio = this._userFormGroup.value.bio;

    // post user modal to server
    this._userService
      .postUser(this._userModal)
      .pipe(takeUntil(this._unsubscriberService.destroy$))
      .subscribe({
        next: (res) => {
          this._userFormGroup.reset();
          this._localStorageService.setItem(
            environment.zeus_user_id,
            res.id.toString()
          );
          this._router.navigate(['/user/profile']);
        },
        error: (err) => {
          this._errorMessageSubject.next(err);
        },
      });
  }

  updateUser() {
    // bind user modal
    this._userModal.name = this._userFormGroup.value.name;
    this._userModal.email = this._userFormGroup.value.email;
    this._userModal.bio = this._userFormGroup.value.bio;

    // post user modal to server
    this._userService
      .putUser(this._userModal)
      .pipe(takeUntil(this._unsubscriberService.destroy$))
      .subscribe({
        next: () => {
          this._userFormGroup.reset();
          this._router.navigate(['/user/profile']);
        },
        error: (err) => this._errorMessageSubject.next(err),
      });
  }
  mapingUser() {
    this._userService
      .getSingleUser(this._userId)
      .pipe(
        takeUntil(this._unsubscriberService.destroy$),
        catchError((err: any) => {
          this._errorMessageSubject.next(err.message);
          return EMPTY; // create new observable that emit error and end the life cycle
        })
      )
      .subscribe((user) => {
        // bind user modal
        this._userModal.id = user.id;
        this._userFormGroup.controls['name'].setValue(user.name);
        this._userFormGroup.controls['email'].setValue(user.email);
        this._userFormGroup.controls['bio'].setValue(user.bio);
      });
  }
  //#endregion
}
