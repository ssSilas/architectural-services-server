import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import config from 'helpers/db/config';
import { CreateUserDto, UserDataForTokenDto } from 'helpers/dto/user.dto';
import { ClienteEntity } from 'src/cliente/cliente.entity';
import { ClienteService } from 'src/cliente/cliente.service';
import { ArquitetoService } from 'src/arquiteto/arquiteto.service';
import { ArquitetoEntity } from 'src/arquiteto/arquiteto.entity';

@Injectable()
export class Tokengenerate {
  constructor(
    private readonly jwtService: JwtService
  ) { }

  async tokenApidot8(user: UserDataForTokenDto, server: string) {
    const secretKey: string = config().secretKey;

    const duration_token_web: string = config().durationToken;//horas : minutos
    let duration: string = duration_token_web;
    let date = Date.now();
    let time = duration.split(':');
    let hours: number = parseInt(time[0]);
    let minutes = parseInt(time[1]);
    let oneMinute = 60000;

    let expiration = date + hours * 60 * oneMinute + minutes * oneMinute;
    const objTokengenerate: object = {
      iss: server,
      aud: server,
      exp: parseInt(expiration.toString().slice(0, 10)),
      iat: Math.round(date / 1000),
      nbf: Math.round(date / 1000),
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
      }
    }
    return this.jwtService.sign(objTokengenerate, { secret: secretKey, algorithm: 'HS256', })
  }
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('CLIENTE')
    private readonly clienteRepo: typeof ClienteEntity,

    @Inject("ARQUITETO")
    private readonly arquitetoRepo: typeof ArquitetoEntity,

    private readonly tokenGenerate: Tokengenerate,
    private readonly clienteService: ClienteService,
    private readonly arqutetoService: ArquitetoService
  ) { }

  async createUser(body: CreateUserDto) {
    try {
      //validations
      await this.arqutetoService.emailExist(body.email)
      await this.clienteService.emailExist(body.email)

      const generatePass = this.createHashForPass(body.password)
      if (body.role == "cliente") {
        return await this.clienteRepo.create({
          ...body,
          password: generatePass,
        })
      }

      if (body.role == "arquiteto") {
        return await this.arquitetoRepo.create({
          ...body,
          password: generatePass,
        })
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async login(user: UserDataForTokenDto, host: string) {
    try {
      const response = await this.tokenGenerate.tokenApidot8(user, host)
      return { token: response }
    } catch (error) {
      throw error
    }
  }

  async validateUser(login: string, password: string) {
    let user: ClienteEntity | ArquitetoEntity
    let compare: boolean

    try {
      const cliente = await this.clienteService.findByEmail(login)
      const arquiteto = await this.arqutetoService.findByEmail(login)

      user = cliente || arquiteto
      if (!user) {
        throw new UnauthorizedException(
          "O usuario não existe, favor informar um login válido"
        );
      }
      const passForCompare = this.createHashForPass(password)
      compare = passForCompare === user.password;

      console.log(user instanceof ClienteEntity ? "cliente" : "arquiteto")
      const response: object = {
        id: user.id,
        email: user.email,
        role: user instanceof ClienteEntity ? "cliente" : "arquiteto"
      }

      if (!compare) return null
      return response
    } catch (error) {
      throw error
    }
  }

  createHashForPass(password: string) {
    const salt: string = config().salt;
    const baseHash = String(salt + password)
    const hash = createHash('sha1').update(baseHash).digest('hex')
    return hash
  }
}