import { Module } from "@nestjs/common";
import { Bcrypt } from "./bcrypt/bcrypt";
import { AuthService } from "./services/auth.service";
import { UsuarioModule } from "../usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "./constants/constants";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controllers/auth.controller";


@Module({
imports:[
    UsuarioModule,
    PassportModule,
    JwtModule.register({
    secret:jwtConstants.secret,
    signOptions: {expiresIn: '1h'}
    })],
    providers:[Bcrypt,AuthService,LocalStrategy,JwtStrategy],
    controllers:[AuthController],
    exports:[Bcrypt]
})
export class AuthModule{}