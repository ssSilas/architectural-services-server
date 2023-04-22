import { Module } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { ServicoEntity } from './servico.entity';

@Module({
  controllers: [ServicoController],
  providers: [
    ServicoService,
    {
      provide: 'SERVICO',
      useValue: ServicoEntity
    },
  ],
  exports: ['SERVICO', ServicoService]
})
export class ServicoModule { }
