import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserManagers } from '@models/interfaces/user-managers/user-managers';
import { HttpCallsService } from '@services/generic/http-calls/http-calls.service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserManagersService {
  private _url = {
    user: '/usersManagers',
  };

  constructor(
    private httpClient: HttpClient,
    private _httpCalls: HttpCallsService
  ) {}

  getUserManagers(): Observable<IUserManagers[]> {
    debugger;
    return this.httpClient
      .get<IUserManagers[]>(environment.api + this._url.user)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error :', errorResponse.error.message);
    } else {
      console.error('Server Side Error :', errorResponse);
    }
    return throwError(
      'There is a problem with the service. We are notified & working on it. Please try again later.'
    );
  }

  getUserManager(id: number): Observable<IUserManagers> {
    debugger;
    return this.httpClient
      .get<IUserManagers>(`${environment.api + this._url.user + '?id=' + id}`)
      .pipe(
        map((res: any) => {
          return {
            id: res[0].id,
            fullName: res[0].fullName,
            email: res[0].email,
            phone: res[0].phone,
            contactPreference: res[0].contactPreference,
            skills: res[0].skills,
          };
        })
      );
  }

  postUser(data: IUserManagers): Observable<IUserManagers> {
    return this._httpCalls
      .consumingAPI<IUserManagers>(
        environment.api + this._url.user,
        'POST',
        data
      )
      .pipe(map((res) => res as IUserManagers));
  }

  putUser(user: IUserManagers): Observable<IUserManagers> {
    return this._httpCalls
      .consumingAPI<IUserManagers>(
        environment.api + this._url.user + '/' + user.id,
        'PUT',
        user
      )
      .pipe(map((res) => res as IUserManagers));
  }


  deleteUserManagers(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this._url.user}/${id}`)
      .pipe(catchError(this.handleError));
  }
}
