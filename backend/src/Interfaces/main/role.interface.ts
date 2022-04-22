/**
 * Роль пользователя
 *
 * @interface
 */
export interface Role {

  /**
   * id роли
   */
  id?: number;

  /**
   * Наименование роли (EN)
   */
  name: string;

  /**
   * Наименование роли (RU)
   */
  short_description: string;

  /**
   * Подробное описание роли (RU)
   */
  long_description: string;
}