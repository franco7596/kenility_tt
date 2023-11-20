import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  getToken() {
    const token = this.jwtService.sign({})
    return {token};
  }

}
