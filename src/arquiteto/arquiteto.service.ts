import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ArquitetoEntity } from './arquiteto.entity';

@Injectable()
export class ArquitetoService {
  constructor(
    @Inject("ARQUITETO")
    private readonly arquitetoRepo: typeof ArquitetoEntity
  ) { }

  async findAll(){
    return await this.arquitetoRepo.findAll()
  }
  
  async findByEmail(email: string) {
    try {
      const user = await this.arquitetoRepo.findOne({
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
      const validation = await this.arquitetoRepo.findOne({
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
