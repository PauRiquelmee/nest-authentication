import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { UserI } from './interfaces/user-interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private readonly userModel: Model<UserI>) {}

  async findOne(username: string): Promise<UserI> {
    try {
      const user: UserI = await this.userModel.findOne({
        username: `${username}`,
      });
      if (!user) {
        throw new NotFoundException(`Not found username: ${username}`);
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers(): Promise<UserI[]> {
    try {
      const users: UserI[] = await this.userModel.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(id: string): Promise<UserI> {
    try {
      const user: UserI = await this.userModel.findById(id);
      if (!user) {
        throw new NotFoundException(`Not found user ${id}`);
      }
      return user;
    } catch (error) {}
  }
  async createUser(userDto: CreateUserDto): Promise<UserI> {
    try {
      const { password } = userDto;
      const salt = await bcrypt.genSalt();
      const newUser: UserI = new this.userModel(userDto);
      newUser.password = await this.hashPassword(password, salt);
      const save = await newUser.save();
      return save;
    } catch (error) {
      console.log(error);
    }
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (error) {}
  }

  async updateUser(id: string, userDto: UpdateUserDto): Promise<UserI> {
    try {
      const updateUser: UserI = await this.userModel.findByIdAndUpdate(
        id,
        userDto,
        {
          new: true,
        },
      );
      if (!updateUser) {
        throw new NotFoundException(`not found user ${id}`);
      }
      const save = await updateUser.save();
      return save;
    } catch (error) {}
  }
  async deleteUser(id: string): Promise<UserI> {
    try {
      const deleteUser: UserI = await this.userModel.findByIdAndDelete(id);
      if (!deleteUser) {
        throw new NotFoundException(`not found user ${id}`);
      }
      return deleteUser;
    } catch (error) {
      console.log(error);
    }
  }
}
