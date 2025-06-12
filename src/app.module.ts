import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/user.module';
import { DiarioModule } from './diario/diario.module';

@Module({
  imports: [ClientesModule, DiarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
