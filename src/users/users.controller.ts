import { Controller, Get, Post, Body, Patch, Param, UseGuards, UseInterceptors, UploadedFile, Res, Req  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../token/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response, Request } from 'express';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profilePicture'))
  create(
    @UploadedFile() file,
    // @Body() createUserDto: CreateUserDto
    @Body('name') name: string,
    @Body('lastName') last_name: string,
    @Body('address') address: string,
    @Req() req: Request
    ) {
      const createUserDto: CreateUserDto = {name, last_name, address, profilePicture: file.filename}
    return this.usersService.create( createUserDto, req);
  }


  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string ) {
    return this.usersService.findOne(id);
  }

  @Get('images/:name')
  findImage(@Param('name') name: string, @Res() res: Response ) {
    return this.usersService.findImage(name, res)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

}
