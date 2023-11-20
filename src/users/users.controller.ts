import { Controller, Get, Post, Body, Param, UseGuards, UseInterceptors, UploadedFile, Res, Req  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../token/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';
import { getURL } from './helper/getURL.helper';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture'))
  @UseGuards(JwtAuthGuard)
  create(
    @UploadedFile() file,
    @Body('name') name: string,
    @Body('last_name') last_name: string,
    @Body('address') address: string,
    @Req() req: Request
    ) {
      const createUserDto: CreateUserDto = {name, last_name, address, profilePicture: getURL(req, file.filename)}
    return this.usersService.create( createUserDto);
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string ) {
    return this.usersService.findOne(id);
  }

  @Get('images/:name')
  findImage(@Param('name') name: string, @Res() res: Response ) {
    return this.usersService.findImage(name, res)
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('profilePicture'))
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @UploadedFile() file,     
  @Body('name') name: string,
  @Body('last_name') last_name: string,
  @Body('profilePicture') profilePicture: string,
  @Body('address') address: string,
  @Req() req: Request) {
    if(!file) return this.usersService.update(id, {name, last_name, address, profilePicture});
    const updateUserDto: UpdateUserDto = {name, last_name, address, profilePicture: getURL(req, file.filename)}
    return this.usersService.update(id, updateUserDto);
  }

}
