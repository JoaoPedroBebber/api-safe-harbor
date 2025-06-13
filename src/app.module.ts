import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { DiarioModule } from './diario/diario.module';

@Module({
  imports: [UsersModule, DiarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
