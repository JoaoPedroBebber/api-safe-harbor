import { IsString } from 'class-validator';

/**
 * DTO para criação de anotação no diário.
 */
export class CreateDiarioDto {
  @IsString()
  idUser: string;

  @IsString()
  conteudo: string;
}
