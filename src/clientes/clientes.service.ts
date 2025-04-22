import { Injectable } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import PrismaService from 'prisma/prisma.service';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}


  /**Converte o objeto generico para a entidade cliente */
  private mapToEntity(cliente: any): Cliente {
    return {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      endereco: cliente.endereco,
      dataCadastro: cliente.dataCadastro,
    };
  }

  /** Criando novo Cliente */
  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = await this.prisma.cliente.create({
      data: createClienteDto,
    });

    return this.mapToEntity(cliente);
  }

  /** Encontrando todos os Clientes */
  async findAll(): Promise<Cliente[]> {
    const clientes = await this.prisma.cliente.findMany();

    return clientes.map(
      clientes => this.mapToEntity(clientes)
    );
  }

  /** Encontrando o cliente pelo seu ID  */
  async findOne(id: String) {
    const cliente = await this.prisma.cliente.findMany({
      where: { id: id.toString() },
    });
    
    return cliente.map(
      clientes => this.mapToEntity(clientes)
    );
  }


  /** Atualizando o cliente pelo seu ID */
 async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.prisma.cliente.update({
      where: { id: id.toString() },
      data: updateClienteDto,
    });
    return this.mapToEntity(cliente);
  }

  /** Deletando o cliente pelo seu ID */
  async remove(id: string): Promise<Cliente> {
    const cliente = await this.prisma.cliente.delete({
      where: { id: id.toString() },
    });
    return this.mapToEntity(cliente);
  }
}
