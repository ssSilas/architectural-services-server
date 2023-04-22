import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ServicoCreateDto {
  @IsString()
  @IsNotEmpty()
  descricao: string

  @IsNumber()
  @IsNotEmpty()
  idarquiteto: number
}

export class ServicoUpdateDto {
  @IsString()
  @IsNotEmpty()
  descricao: string
}