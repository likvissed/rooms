import { IsNotEmpty, Max, IsInt, Min } from 'class-validator';

export class UpdateUserDto {
  
  @IsNotEmpty({ message: 'Роль не может быть пустой'})
  readonly role_id: number;
}