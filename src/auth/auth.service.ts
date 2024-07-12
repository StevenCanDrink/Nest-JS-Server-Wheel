import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByNameAndPassword(
      username,
      password,
    );
    if (user) {
      const { username, password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
