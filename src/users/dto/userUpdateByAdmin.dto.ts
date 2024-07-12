export class UserUpdateDtoByAdmin {
  privilege: number;
  turn: number;
  point: number;
  username: string;
  password: string;
  name: string;
  role: 'ADMIN' | 'USER';
}
