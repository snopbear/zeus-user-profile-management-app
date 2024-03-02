/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UnsubscriberService } from './unsubscriber.service';

describe('Service: Unsubscriber', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnsubscriberService]
    });
  });

  it('should ...', inject([UnsubscriberService], (service: UnsubscriberService) => {
    expect(service).toBeTruthy();
  }));
});
