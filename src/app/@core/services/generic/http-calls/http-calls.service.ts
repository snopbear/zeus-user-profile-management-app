import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestType } from '@models/index';

/*
HttpResponse : A full HTTP response, including a typed response body (which may be null if one was not returned).
HttpEvent: Union type for all possible events on the response stream.


*/
@Injectable({
  providedIn: 'root',
})
export class HttpCallsService {
  constructor(private __http: HttpClient) {}

  /**
   * Sends request based on requestType
   * @param url url for sending request
   * @param requestType sets request type based on REST modes
   * @param data data to be sent in body
   * @param optionsObserveResponse to be sent in header Observe different types of response in HttpClient a
   * @returns Observable based on requestType
   */
  consumingAPI<T>(
    url: string,
    requestType: HttpRequestType,
    data?: any,
    optionsObserveResponse?: {}
  ): Observable<Partial<HttpResponse<T>> | Partial<HttpEvent<T>> | Partial<T>> {
    switch (requestType) {
      case 'GET':
        return this.__http.get<T>(url, optionsObserveResponse);
      case 'POST':
        return this.__http.post<T>(url, data, optionsObserveResponse);
      case 'PUT':
        return this.__http.put<T>(url, data, optionsObserveResponse);
      case 'DELETE':
        return this.__http.delete<T>(url, optionsObserveResponse);
    }
  }
}
