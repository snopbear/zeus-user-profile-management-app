import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpCallsService } from '@services/index';
import { IUser } from '@models/index';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url = {
    user: '/users',
  };

  constructor(private _httpCalls: HttpCallsService) {}

  getUsers(): Observable<IUser[]> {
    return this._httpCalls
      .consumingAPI<IUser[]>(`${environment.api + this._url.user}`, 'GET')
      .pipe(map((res) => res as IUser[]));
  }

  getSingleUser(id: string): Observable<IUser> {
    return this._httpCalls
      .consumingAPI<IUser>(
        `${environment.api + this._url.user + '?id=' + id}`,
        'GET'
      )
      .pipe(
        map((res: any) => {
          return {
            id: res[0].id,
            name: res[0].name,
            email: res[0].email,
            bio: res[0].bio,
          };
        })
      );
  }
  postUser(data: IUser): Observable<IUser> {
    return this._httpCalls
      .consumingAPI<IUser>(environment.api + this._url.user, 'POST', data)
      .pipe(map((res) => res as IUser));
  }

  putUser(user: IUser): Observable<IUser> {
    return this._httpCalls
      .consumingAPI<IUser>(
        environment.api + this._url.user + '/' + user.id,
        'PUT',
        user
      )
      .pipe(map((res) => res as IUser));
  }
}
