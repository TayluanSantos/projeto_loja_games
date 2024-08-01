import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local"; // Cuidado para não importar da passport-jwt 
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            // Por padrão, ele define o usernameField como: username e passworField como: password. Sem precisar passar no field.
            usernameField: 'usuario', // Usar nome do atributo 'username' que foi definido no UsuarioLogin.
            passwordField: 'senha' // Usar nome do atributo 'password' que foi definido no UsuarioLogin.
        })
    }

    async validate(username:string,password:string): Promise<any> {
        const user = await this.authService.validateUser(username,password)

        // Validando se o usuário existe
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}