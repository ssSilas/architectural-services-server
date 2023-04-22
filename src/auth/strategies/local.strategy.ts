import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    })
  }

  async validate(email: string, password: string) {
    console.log(email)
    console.log(password)
    try {
      const user = await this.authService.validateUser(email, password)
      console.log(user)
      if (!user) throw new UnauthorizedException({ message: "Login e/ou senha inválidos" })

      return user
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}