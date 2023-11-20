import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { jwtStrategy } from 'src/token/jwt.stategy';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { renameImage } from './helper/images.helper';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports:[
    MongooseModule.forFeature([
    {
      name: User.name,
      schema: UserSchema
    }
  ]),
  MulterModule.register({
    storage: diskStorage({
      destination: './images',
      filename: renameImage
    })
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '..', 'images'),
  }),
],
  controllers: [UsersController],
  providers: [UsersService, jwtStrategy],
})
export class UsersModule {}
