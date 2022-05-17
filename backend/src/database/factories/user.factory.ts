import { UserEntity } from '../../entities/main/user.entity';
import { Faker } from '@faker-js/faker';
import { define } from "typeorm-seeding";


define(UserEntity, (faker: typeof Faker) => {
  const user = new UserEntity();

  user.tn = ***REMOVED***;
  user.id_tn = ***REMOVED***;
  user.phone = '***REMOVED***';
  user.fullname = '***REMOVED***';

  return user;
});