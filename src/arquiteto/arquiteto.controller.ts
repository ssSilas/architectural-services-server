import { Controller, Get } from '@nestjs/common';
import { ArquitetoService } from './arquiteto.service';

@Controller('arquiteto')
export class ArquitetoController {
  constructor(private readonly arquitetoService: ArquitetoService) { }

  @Get()
  async getAll() {
    return await this.arquitetoService.findAll()
  }
}
