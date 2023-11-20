import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    MongooseModule.forRoot( process.env.DB_URL ||'mongodb://localhost/nest'),
    UsersModule,
    TokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
