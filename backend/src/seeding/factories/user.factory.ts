import { User } from '../../entities/main/user.entity';
import { Faker } from '@faker-js/faker';
import { define } from "typeorm-seeding";


define(User, (faker: typeof Faker) => {
  const user = new User();

  user.tn = ***REMOVED***;
  user.id_tn = ***REMOVED***;
  user.phone = '***REMOVED***';
  user.fullname = '***REMOVED***';

  return user;
});