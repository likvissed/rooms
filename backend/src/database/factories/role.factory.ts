import { RoleEntity } from '../../entities/main/role.entity';
import { Faker } from '@faker-js/faker';
import { define } from "typeorm-seeding";

define(RoleEntity, (faker: typeof Faker) => {
  const role = new RoleEntity();

  role.name = 'admin';
  role.short_description = 'Администратор';
  role.long_description = 'Полные права доступа на все модели';

  return role;
});
