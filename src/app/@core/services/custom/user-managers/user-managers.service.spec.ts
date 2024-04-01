/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserManagersService } from './user-managers.service';

describe('Service: UserManagers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserManagersService]
    });
  });

  it('should ...', inject([UserManagersService], (service: UserManagersService) => {
    expect(service).toBeTruthy();
  }));
});
