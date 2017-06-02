import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';
import { Observable } from "rxjs";

import { JwtService } from './jwt.service';
import { AppConstants } from '../../constants/app.constants';

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private jwtService: JwtService
  ) {}

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.jwtService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Token ${token}`;
    }

    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json().errors);
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(
      `${AppConstants.apiHost}${path}`,
      { headers: this.setHeaders(), search: params }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json().data);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${AppConstants.apiHost}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json().data);
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${AppConstants.apiHost}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json().data);
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${AppConstants.apiHost}${path}`,
      { headers: this.setHeaders() }
    )
    .catch(this.formatErrors)
    .map((res: Response) => res.json().data);
  }
}
