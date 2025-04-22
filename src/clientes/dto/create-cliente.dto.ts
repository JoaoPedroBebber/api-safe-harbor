import { IsEmail, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  telefone: string;

  @IsString()
  endereco: string;
}
