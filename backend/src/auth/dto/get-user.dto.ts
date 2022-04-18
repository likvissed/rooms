export class GetUserDto {

  /**
   * Табельный номер
   */
  readonly tn: string;

  /**
   * Отдел
   */
  readonly dept: string;

  /**
   * Фамилия имя отчество
   */
  readonly fio: string;

  readonly room: string;

  /**
   * Рабочий телефон
   */
  readonly tel: string;

  /**
   * Электронная почта
   */
  readonly email: string;

  readonly comment: string;

  readonly duty: string;

  readonly status: string;

  readonly datereg: string;

  readonly duty_code: string;

  /**
   * Фамилия И.О.
   */
  readonly fio_initials: string;

  readonly category: string;

  /**
   * id_tn пользователя
   */
  readonly id_tn: string;

  /**
   * Логин
   */
  readonly login: string;

  readonly dept_kadr: string;

  readonly ms: string;

  readonly tn_ms: string;

  readonly adLogin: string;

  readonly mail: string;

  readonly surname: string;

  readonly firstname: string;

  readonly middlename: string;

  readonly initials_family: string;

  readonly family_with_initials: string;

  readonly is_chief: boolean;
}