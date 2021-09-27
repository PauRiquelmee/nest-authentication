import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constanst';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpliration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  validate(payload: any) {
    try {
      return {
        _id: payload.sub,
        username: payload.username,
        createdAt: payload.createdAt,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
