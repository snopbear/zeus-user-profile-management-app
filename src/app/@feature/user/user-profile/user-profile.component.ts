import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subject, catchError, takeUntil } from 'rxjs';
import { IUser } from '@models/index';
import {
  PageTitleService,
  LocalStorageService,
  UnsubscriberService,
  UserService,
} from '@services/index';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'zeus-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UnsubscriberService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  //#region service initialization
  _router = inject(Router);

  _userService = inject(UserService);

  _localStorageService = inject(LocalStorageService);

  _pageTitleService = inject(PageTitleService);

  _unsubscriberService = inject(UnsubscriberService);
  //#endregion

  //#region observable & stream initialization
  _user$!: Observable<IUser>;

  private _errorMessageSubject = new Subject<string>();
  _errorMessage$ = this._errorMessageSubject.asObservable();
  //#endregion

  //#region private utilities
  setPageTitle() {
    this._pageTitleService.setPageTitle(
      'User Profile - Zeus Profile Managment Application'
    );
  }
  //#endregion

  //#region life cycle hooks
  ngOnInit(): void {
    this.setPageTitle();
    
    this._localStorageService
      .getItemObservable(environment.zeus_user_id)
      .pipe(takeUntil(this._unsubscriberService.destroy$))
      .subscribe((user_id) => {
        this._user$ = this._userService.getSingleUser(user_id!).pipe(
          catchError((err: any) => {
            this._errorMessageSubject.next(err.message);
            return EMPTY; // create new observable that emit error and end the life cycle
          })
        );
      });
  }
  //#endregion

  //#region methods
  edit(): void {
    this._localStorageService
      .getItemObservable(environment.zeus_user_id)
      .subscribe((user_id) => {
        this._router.navigate(['/user/edit-profile/' + user_id]);
      });
  }
  //#endregion
}
