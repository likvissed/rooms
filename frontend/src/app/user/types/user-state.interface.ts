import { RoleInterface } from './role.interface';
import { UserInterface } from './user.interface';
export interface UserStateInterface {
  isSubmitting: boolean
  validationsErrors: null
  roles: [RoleInterface]
  user: UserInterface
}
