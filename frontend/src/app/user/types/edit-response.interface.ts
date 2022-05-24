import { UserInterface } from './user.interface';
import { RoleInterface } from './role.interface';

export interface EditResponseInterface {
  user: UserInterface
  roles: [RoleInterface]
}
