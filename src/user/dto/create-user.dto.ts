import { IsString, IsEmail } from 'class-validator';

/**
 * DTO para criação de usuário.
 */
export class CreateUserDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  senhaHash: string;
}
