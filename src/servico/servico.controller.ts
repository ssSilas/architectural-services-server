import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { User } from 'helpers/custom-decorator/user.decorator';
import { UserDataForTokenDto } from 'helpers/dto/user.dto';
import { ServicoCreateDto, ServicoUpdateDto } from 'helpers/dto/servico.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('servico')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) { }

  @Get()
  async getAll() {
    return await this.servicoService.findAll()
  }

  @Post()
  async create(@Body() body: ServicoCreateDto, @User() user: UserDataForTokenDto) {
    return await this.servicoService.create(body, user)
  }

  @Put()
  async update(@Query('id') id: number, @Body() body: ServicoUpdateDto, @User() user: UserDataForTokenDto) {
    return await this.servicoService.update(id, body, user)
  }

  @Delete()
  async delete(@Query('id') id: number, @User() user: UserDataForTokenDto) {
    return await this.servicoService.delete(id, user)
  }
}
