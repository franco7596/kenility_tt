import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/users.schema';
import { Model } from 'mongoose'
import {  Response } from 'express';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModule: Model<UserDocument>){}

  async create(createUserDto: CreateUserDto) {
    const userCreated = await this.userModule.create(createUserDto)
    return userCreated;
  }

  async findAll() {
    const allUsers = await this.userModule.find({})
    return allUsers;
  }
  
  async findOne(id: string) {
    const user = await this.userModule.findById({ _id: id })
    if(!user) throw new HttpException('User not found', 404)
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModule.findByIdAndUpdate(
      id,
      { $set: updateUserDto },
      { new: true } 
    );

    if (!existingUser) { 
      throw new HttpException('User not found', 404);
    }

    return existingUser;
  }

  findImage(name: string, res: Response){
    res.sendFile(name ,{ root: './images' })
  }

}
