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

  /**
   * Рабочий телефон
   */
  readonly tel: string;

  /**
   * Электронная почта
   */
  readonly email: string;

  /**
   * Фамилия И.О.
   */
  readonly fio_initials: string;

  /**
   * id_tn пользователя
   */
  readonly id_tn: string;

  /**
   * Логин
   */
  readonly login: string;
}