import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserI } from './interfaces/user-interface';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getUsers(@Res() res: Response): Promise<UserI[]> {
    try {
      const users: UserI[] = await this.usersService.getUsers();
      res.status(HttpStatus.OK).json({
        message: 'Storage User',
        users,
      });
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: string, @Res() res: Response): Promise<UserI> {
    try {
      const user: UserI = await this.usersService.getUser(id);
      res.status(HttpStatus.OK).json({
        message: 'Storage user',
        user,
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  @Post()
  async createUser(
    @Body() userDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<UserI> {
    try {
      const createUser = await this.usersService.createUser(userDto);
      res.status(HttpStatus.OK).json({
        message: 'Create User',
        user: createUser,
      });
      return createUser;
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<UserI> {
    try {
      const updateUser = await this.usersService.updateUser(id, userDto);
      res.status(HttpStatus.OK).json({
        message: 'Update User',
        user: updateUser,
      });
      return updateUser;
    } catch (error) {
      console.log(error);
    }
  }
  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<UserI> {
    try {
      const deleteUser = await this.usersService.deleteUser(id);
      res.status(HttpStatus.OK).json({
        message: 'Delete User',
        user: deleteUser,
      });
      return deleteUser;
    } catch (error) {
      console.log(error);
    }
  }
}
