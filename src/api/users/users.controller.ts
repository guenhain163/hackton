import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { JwtBearer, SHOW_CONTROLLER_IN_SWAGGER } from '@utils/header';
import { UsersService } from './users.service';
import { CreateUserDto } from '@api/users/dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  async findAll() {
    const user = await this.usersService.findAll();
    return user;
  }

  @Post()
  async create(
    @Body() body: CreateUserDto,
  ) {
    return await this.usersService.create(body);
  }
}
