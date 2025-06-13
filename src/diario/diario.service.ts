import { Injectable } from '@nestjs/common';
import { CreateDiarioDto } from './dto/create-diario.dto';
import { UpdateDiarioDto } from './dto/update-diario.dto';
import PrismaService from 'prisma/prisma.service';
import { Diario } from './entities/diario.entity';

@Injectable()
export class DiarioService {
  constructor(private prisma: PrismaService) {}

  /**Converte o objeto generico para a entidade user */
  private mapToEntity(diario: any): Diario {
    return {
      id: diario.id,
      idUser: diario.nome,
      conteudo: diario.email,
      dataCadastro: diario.dataCadastro,
    };
  }

  /** Criando novo Diario */
  async create(createDiarioDto: CreateDiarioDto): Promise<Diario> {
    const diario = await this.prisma.diario.create({
      data: {
        idUser: createDiarioDto.idUser,
        conteudo: createDiarioDto.conteudo,
        dataCadastro: new Date(),
      },
    });

    return this.mapToEntity(diario);
  }

  /** Encontrando todos os Diarios */
  async findAll(idUser?: string): Promise<Diario[]> {
    const diarios = await this.prisma.diario.findMany({
      where: {
        ...(idUser && { idUser: { contains: idUser, mode: 'insensitive' } }),
      },
      orderBy: {
        idUser: 'asc', // Ordena por idUser por padrão
      },
    });

    return diarios.map((diario) => this.mapToEntity(diario));
  }

  /** Encontrando o cliente pelo seu ID  */
  async findOne(id: String) {
    const diario = await this.prisma.diario.findUnique({
      where: { id: id.toString() },
    });

    return diario ? this.mapToEntity(diario) : null;
  }

  /** Atualizando o cliente pelo seu ID */
  async update(
    id: string,
    updateDiarioDto: UpdateDiarioDto,
  ): Promise<Diario> {
    const diario = await this.prisma.diario.update({
      where: { id: id.toString() },
      data: updateDiarioDto,
    });
    return this.mapToEntity(diario);
  }

  /** Deletando o cliente pelo seu ID */
  async remove(id: string): Promise<Diario> {
    const diario = await this.prisma.diario.delete({
      where: { id: id.toString() },
    });
    return this.mapToEntity(diario);
  }
}
