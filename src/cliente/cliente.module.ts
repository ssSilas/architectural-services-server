import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { ClienteEntity } from './cliente.entity';

@Module({
  controllers: [ClienteController],
  providers: [
    ClienteService,
    {
      provide: 'CLIENTE',
      useValue: ClienteEntity
    },
  ],
  exports: ['CLIENTE', ClienteService]
})
export class ClienteModule { }
