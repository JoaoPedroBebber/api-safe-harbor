import { Module } from '@nestjs/common';
import { DiarioService, } from './diario.service';
import { DiarioController } from './diario.controller';
import PrismaService from 'prisma/prisma.service';

@Module({
  controllers: [DiarioController],
  providers: [DiarioService, PrismaService],
  exports: [DiarioService],
})
export class DiarioModule {}
