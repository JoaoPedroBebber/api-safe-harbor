import { IsString } from 'class-validator';

export class CreateDiarioDto {
  @IsString()
  idUser: string;

  @IsString()
  conteudo: string;

  @IsString()
  senhaHash: string;
}
