import { IsNotEmpty, IsNumberString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @MaxLength(15, { message: 'Табельный номер должен быть не более 15 символов'})
  @IsNotEmpty({ message: 'Табельный номер не может быть пустым'})
  @IsNumberString({ message: 'Табельный номер не является числом'})
  readonly tn: number;
  
  @IsNotEmpty({ message: 'Роль не может быть пустой'})
  readonly role_id: number;
}