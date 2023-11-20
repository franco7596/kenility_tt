import { Controller, Get, Post, Body, Param, UseGuards, UseInterceptors, UploadedFile, Res, Req, HttpException  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserWithoutImageDto } from './dto/create-user.dto';
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
    @Body() createUserWithoutImageDto: CreateUserWithoutImageDto,  
    @Req() req: Request
    ) {
      const createUserDto: CreateUserDto = {...createUserWithoutImageDto, profilePicture: getURL(req, file.filename)}
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
  @Body() editUserWithoutImageDto: CreateUserWithoutImageDto,    
  @Body('profilePicture') profilePicture: string,
  @Req() req: Request) {
    if(!file){
      if(profilePicture)return this.usersService.update(id, {...editUserWithoutImageDto, profilePicture});
      throw new HttpException('profilePicture should not be empty', 404);
    } 
      
    const updateUserDto: UpdateUserDto = {...editUserWithoutImageDto, profilePicture: getURL(req, file.filename)}
    return this.usersService.update(id, updateUserDto);
  }

}
