import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose'
import {getURL} from './helper/getURL.helper'
import { Request, Response } from 'express';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModule: Model<UserDocument>){}

  async create(createUserDto: CreateUserDto, req: Request) {
    const userCreated = await this.userModule.create({...createUserDto, profilePicture: getURL(req, createUserDto.profilePicture)})
    return userCreated;
  }

  async findAll() {
    const allUsers = await this.userModule.find({})
    return allUsers;
  }
  
  async findOne(id: string) {
    const user = await this.userModule.findById({ _id: id })
    if(!user) throw new HttpException('not found', 404)
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModule.findById({ _id: id })
    if(!user) throw new HttpException('not found', 404)
    // const userEdited = await this.userModule.updateOne()
    return `This action updates a #${id} user`;
  }

  findImage(name: string, res: Response){
    res.sendFile(name ,{ root: './images' })
  }

}
