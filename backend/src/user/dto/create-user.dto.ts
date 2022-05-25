import { IsNotEmpty, IsInt, Max } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
export class CreateUserDto {
  // @IsNotEmpty({ message: i18nValidationMessage('validation.NOT_EMPTY') })
  @IsNotEmpty({ message: 'Табельный номер не может быть пустым'})
  @IsInt({ message: 'Табельный номер не является целым числом'})
  @Max(999999999999999, { message: 'Табельный номер должен быть не более 15 символов'})
  @Max(999999999999999, {
    message: i18nValidationMessage('validation.MAX', { message: 'SUPER' }),
  })
  readonly tn: number;
  
  @IsNotEmpty({ message: 'Роль не может быть пустой'})
  readonly role_id: number;
}