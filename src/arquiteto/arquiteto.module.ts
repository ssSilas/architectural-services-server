import { Module } from '@nestjs/common';
import { ArquitetoService } from './arquiteto.service';
import { ArquitetoController } from './arquiteto.controller';
import { ArquitetoEntity } from './arquiteto.entity';

@Module({
  controllers: [ArquitetoController],
  providers: [
    ArquitetoService,
    {
      provide: 'ARQUITETO',
      useValue: ArquitetoEntity
    },
  ],
  exports: ['ARQUITETO', ArquitetoService]

})
export class ArquitetoModule { }
