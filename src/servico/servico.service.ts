import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ServicoCreateDto, ServicoUpdateDto } from 'helpers/dto/servico.dto';
import { UserDataForTokenDto } from 'helpers/dto/user.dto';
import { ServicoEntity } from './servico.entity';
import { async } from 'rxjs';

@Injectable()
export class ServicoService {
  constructor(
    @Inject("SERVICO")
    private readonly servicoRepo: typeof ServicoEntity
  ) { }

  async findAll() {
    return await this.servicoRepo.findAll()
  }

  async create(body: ServicoCreateDto, user: UserDataForTokenDto) {
    console.log(user)
    //status: 0 Reprovado, 1 Aprovado, 2 Pendente
    return await this.servicoRepo.create({
      descricao: body.descricao,
      clientefk: user.id,
      arquitetofk: body.idarquiteto,
      status: 2
    })
  }

  async update(id: number, body: ServicoUpdateDto, user: UserDataForTokenDto) {
    try {
      await this.servicoExist(id)
      await this.isCliente(user)

      return await this.servicoRepo.update(
        { descricao: body.descricao },
        { where: { id } }
      )
    } catch (error) {
      throw error
    }
  }

  async delete(id: number, user: UserDataForTokenDto) {
    await this.servicoExist(id)
    await this.isCliente(user)

    return this.servicoRepo.destroy(
      { where: { id } }
    )
  }

  async isCliente(user: UserDataForTokenDto) {
    try {
      if (user.role != "cliente") throw new UnauthorizedException()
    } catch (error) {
      throw error
    }
  }

  async servicoExist(id: number) {
    try {
      const servico = await this.servicoRepo.findOne({
        attributes: ['id'],
        where: { id }
      })

      if (!servico) throw new BadRequestException({ message: "Serviço inexistente" })
      return servico
    } catch (error) {
      throw error
    }
  }
}
