import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { ArquitetoModule } from './arquiteto/arquiteto.module';
import { ServicoModule } from './servico/servico.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import config from 'helpers/db/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClienteEntity } from './cliente/cliente.entity';
import { ArquitetoEntity } from './arquiteto/arquiteto.entity';
import { ServicoEntity } from './servico/servico.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: config().database.host,
      port: config().database.port,
      username: config().database.user,
      password: config().database.password,
      database: config().database.dbName,
      models: [ClienteEntity, ArquitetoEntity, ServicoEntity],
      define: { updatedAt: false },
      // synchronize: true,
      // autoLoadModels: true
    }),
    ClienteModule,
    ArquitetoModule,
    ServicoModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }