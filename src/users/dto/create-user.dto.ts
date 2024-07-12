export class CreateUserDto {
  name: string;
  username: string;
  password: string;
  email: string;
  role: 'ADMIN' | 'USER';
}
