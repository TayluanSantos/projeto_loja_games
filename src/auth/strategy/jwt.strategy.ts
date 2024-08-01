import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { jwtConstants } from "../constants/constants"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Indica que o JWT virá no cabeçalho Authorization como Bearer Token
            ignoreExpiration: false, // Para levar em consideração o tempo de expiração do token
            secretOrKey: jwtConstants.secret
        })
    }

    // Usado quando queremos devolver alguma informação a mais 
    async validate(payload: any) { 
        return {
            userId: payload.sub
        }
    }
}