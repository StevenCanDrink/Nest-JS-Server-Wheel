import { UsersService } from './users/users.service';
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  ValidationPipe,
  UsePipes,
  Body,
} from '@nestjs/common';

import { AuthenticatedGuard } from './auth/authenticated.guard';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}
  @Post('register')
  create(@Body() user: CreateUserDto) {
    const { name, username, password } = user;
    return this.usersService.Create(username, password, name);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return { msg: 'Loggin' };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user; // Corrected to `req.user`
  }
}
