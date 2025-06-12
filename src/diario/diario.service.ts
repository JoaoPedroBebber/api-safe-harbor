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

  /** Criando novo Cliente */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        nome: createUserDto.nome,
        email: createUserDto.email,
        senhaHash: createUserDto.senhaHash,
        dataCadastro: new Date(),
      },
    });

    return this.mapToEntity(user);
  }

  /** Encontrando todos os User */
  async findAll(nome?: string, email?: string): Promise<User[]> {
    const user = await this.prisma.user.findMany({
      where: {
        ...(nome && { nome: { contains: nome, mode: 'insensitive' } }),
        ...(email && { email: { contains: email, mode: 'insensitive' } }),
      },
      orderBy: {
        nome: 'asc', // Ordena por nome por padrão
      },
    });

    return clientes.map((user) => this.mapToEntity(user));
  }

  /** Encontrando o cliente pelo seu ID  */
  async findOne(id: String) {
    const user = await this.prisma.user.findUnique({
      where: { id: id.toString() },
    });

    return user ? this.mapToEntity(user) : null;
  }

  /** Atualizando o cliente pelo seu ID */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Cliente> {
    const users = await this.prisma.user.update({
      where: { id: id.toString() },
      data: updateUserDto,
    });
    return this.mapToEntity(user);
  }

  /** Deletando o cliente pelo seu ID */
  async remove(id: string): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id: id.toString() },
    });
    return this.mapToEntity(user);
  }
}
