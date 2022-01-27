import { Role } from '@/models/role';

// eslint-disable-next-line import/prefer-default-export
export class User {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public id: number = 0,
    public first_name: string = '',
    public last_name: string = '',
    public email: string = '',
    public role: Role = new Role(),
  ) {}
}
