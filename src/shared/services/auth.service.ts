import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
  route: string = 'users';

  constructor(
    private apiService: ApiService
  ) {}

  signIn(user): Observable<any> {
    return this.apiService
      .post(`${this.route}/login`, user);
  }

  signUp(user): Observable<any> {
    return this.apiService
      .post(this.route, user);
  }
}
