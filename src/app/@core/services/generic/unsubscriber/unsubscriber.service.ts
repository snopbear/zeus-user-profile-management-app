/*
Unsubscribe service implements the OnDestroy interface. 
The service exposes an observable called destroy$ that emits a void value when it is destroyed.
It also provides a helper method called takeUntilDestroy that can be used to unsubscribe from an 
observable when the destroy$ observable emits.

The service implements the ngOnDestroy method, which is called by Angular when the service is destroyed.
 In this method, the service emits the destroy$ observable, which notifies any subscribers that the service
  has been destroyed and they should unsubscribe.

Overall, the service provides a convenient way to manage subscriptions in Angular components and 
services that need to be cleaned up when the component or service is destroyed.
*/

import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Injectable()
export class UnsubscriberService implements OnDestroy {
  public readonly destroy$ = new Subject<void>();

  public readonly takeUntilDestroy = <T>(
    origin: Observable<T>
  ): Observable<T> => origin.pipe(takeUntil(this.destroy$));

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
