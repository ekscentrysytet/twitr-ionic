import { Injectable } from '@angular/core';
import { JwtService } from "./jwt.service";

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService
  ) {}

  isAuthorized(): boolean {
    return !!this.jwtService.getToken();
  }
}
