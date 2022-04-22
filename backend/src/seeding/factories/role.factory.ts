import { Role } from '../../entities/main/role.entity';
import { Faker } from '@faker-js/faker';
import { define } from "typeorm-seeding";

define(Role, (faker: typeof Faker) => {
  const role = new Role();

  role.name = 'admin';
  role.short_description = 'Администратор';
  role.long_description = 'Полные права доступа на все модели';

  return role;
});
