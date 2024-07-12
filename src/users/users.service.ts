import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateValuesMissingError } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }
  async findWithObject(user: object) {
    try {
      const findUser = await this.userRepository.findOneOrFail({
        where: { ...user },
      });
      return findUser;
    } catch (err) {
      throw err;
    }
  }
  async findOneByNameAndPassword(username: string, password: string) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { username: username, password: password },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findOneById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id: id },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  Create(username, password, name) {
    const newUser = this.userRepository.create({
      username,
      password,
      name,
    });
    return this.userRepository.save(newUser);
  }

  CreateByAdmin(user: object) {
    const newUser = this.userRepository.create({ ...user });
    return this.userRepository.save(newUser);
  }

  async ChangePassword(
    id: number,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.findOneById(id);
    if (!user || currentPassword != user.password) {
      throw new NotFoundException();
    }

    user.password = newPassword;

    return this.userRepository.save(user);
  }

  async Update(user: User) {
    const checkDuplicateUser = await this.findWithObject(user);
    if (checkDuplicateUser) {
      return new UpdateValuesMissingError();
    }
    const findUser = await this.findOneById(user.id);
    const updatedUser = { ...findUser, ...user };
    this.userRepository.save(updatedUser);
    return updatedUser;
  }

  async Delete(id: number) {
    const user = await this.findOneById(id);
    await this.userRepository.remove(user);
    return user;
  }
}
