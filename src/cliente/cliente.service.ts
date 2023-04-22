import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClienteEntity } from './cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @Inject("CLIENTE")
    private readonly clienteRepo: typeof ClienteEntity
  ){}

  async findByEmail(email: string) {
    try {
      const user = await this.clienteRepo.findOne({
        raw: true,
        attributes: ['id', 'email', 'password'],
        where: { email }
      });
      return user
    } catch (error) {
      throw error
    }
  }

  async emailExist(email: string) {
    try {
      const validation = await this.clienteRepo.findOne({
        attributes: ['id', 'email'],
        where: { email }
      });

      if (validation) {
        throw new BadRequestException(
          "O email já é utilizado, favor informar um email válido"
        );
      }
    } catch (error) {
      throw error
    }
  }
}
