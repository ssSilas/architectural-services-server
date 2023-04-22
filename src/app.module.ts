import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { ArquitetoModule } from './arquiteto/arquiteto.module';
import { ServicoModule } from './servico/servico.module';

@Module({
  imports: [ClienteModule, ArquitetoModule, ServicoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
