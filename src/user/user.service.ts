import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import PrismaService from 'prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**Converte o objeto generico para a entidade user */
  private mapToEntity(user: any): User {
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      senhaHash: user.senhaHash,
      dataCadastro: user.dataCadastro,
    };
  }

  /** Criando novo User */
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

    return user.map((user) => this.mapToEntity(user));
  }

  /** Encontrando o user pelo seu ID  */
  async findOne(id: String) {
    const user = await this.prisma.user.findUnique({
      where: { id: id.toString() },
    });

    return user ? this.mapToEntity(user) : null;
  }

  /** Atualizando o user pelo seu ID */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: id.toString() },
      data: updateUserDto,
    });
    return this.mapToEntity(user);
  }

  /** Deletando o user pelo seu ID */
  async remove(id: string): Promise<User> {
    const user = await this.prisma.user.delete({
      where: { id: id.toString() },
    });
    return this.mapToEntity(user);
  }
}
