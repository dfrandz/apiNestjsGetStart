import { PassportStrategy } from "@nestjs/passport";
import { Strategy , ExtractJwt } from 'passport-jwt';
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: any) {
      return payload
    }
}
