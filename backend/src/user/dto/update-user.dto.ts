import { IsNotEmpty, Max, IsInt, Min } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Табельный номер не может быть пустым'})
  @IsInt({ message: 'Табельный номер не является целым числом'})
  @Max(999999999999999, { message: 'Табельный номер должен быть не более 15 символов'})
  readonly tn: number;
  
  @IsNotEmpty({ message: 'Роль не может быть пустой'})
  readonly role_id: number;
}