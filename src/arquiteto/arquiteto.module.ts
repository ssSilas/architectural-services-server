import { Module } from '@nestjs/common';
import { ArquitetoService } from './arquiteto.service';
import { ArquitetoController } from './arquiteto.controller';

@Module({
  controllers: [ArquitetoController],
  providers: [ArquitetoService]
})
export class ArquitetoModule {}
