import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserUpdateDtoByAdmin } from './dto/userUpdateByAdmin.dto';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/guard/roles.guard';
@UseGuards(AuthenticatedGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /** ADMIN CONSOLE */
  @Roles('ADMIN')
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll() {
    return this.usersService.findAll();
  }

  /** Get User by id
   * @param id
   */
  @Roles('ADMIN')
  @Get('/find/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneById(id);
  }
  /**
   * Update User
   * @param id
   * @param userUpdatedDto
   * @returns
   */
  @Roles('ADMIN')
  @Post()
  UpdateUserByAdmin(
    id: number,
    @Body() userUpdateDtoByAdmin: UserUpdateDtoByAdmin,
  ) {
    return this.usersService.Update({ id, ...userUpdateDtoByAdmin });
  }
  @Roles('ADMIN')
  @Post('create')
  @UsePipes(ValidationPipe)
  CreateUserByAdmin(@Body() userUpdateDtoByAdmin: UserUpdateDtoByAdmin) {
    return this.usersService.CreateByAdmin(userUpdateDtoByAdmin);
  }
  @Roles('ADMIN')
  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.Delete(id);
  }

  /** USER CONSOLE ** /
  /** Get Profile
   * @Param id
   */
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  /** Change PASSWORD
   *
   * @param req
   * @param userUpdate
   * @returns
   */

  @Patch('change/password')
  update(@Request() req, @Body() userUpdate: UpdateUserDto) {
    const { id, ...rest } = req.user;
    const { currentPassword, newPassword } = userUpdate;
    return this.usersService.ChangePassword(id, currentPassword, newPassword);
  }
}
