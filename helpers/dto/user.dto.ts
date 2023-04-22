import { IsEmail, IsNotEmpty, IsString, IsNumber } from "class-validator"

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "Favor informar um nome" })
  nome: string

  @IsNotEmpty({ message: "Favor informar um nome" })
  @IsEmail({}, { message: 'Favor informar um email válido' })
  email: string

  @IsNotEmpty({ message: "Favor informar uma senha" })
  @IsString()
  password: string

  @IsString()
  telefone: string

  @IsString()
  genero: string

  @IsNumber()
  idade: number

  @IsString()
  role: string
}

export class UserDataForTokenDto {
  id: number
  email: string
  role:string
}