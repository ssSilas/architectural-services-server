import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService, Tokengenerate } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ClienteModule } from 'src/cliente/cliente.module';
import { ServicoModule } from 'src/servico/servico.module';
import { ArquitetoModule } from 'src/arquiteto/arquiteto.module';

@Module({
  imports: [
    PassportModule,
    ClienteModule,
    ArquitetoModule,
    ServicoModule,
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [Tokengenerate, AuthService, LocalStrategy, JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule { }
