import { UserEntity } from './../../entities/main/user.entity';
import { RoleEntity } from './../../entities/main/role.entity';

import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    // Создание роли "Администратор"
    const roleAdmin = await factory(RoleEntity)().create();

    // Создание остальных ролей
    await connection
      .createQueryBuilder()
      .insert()
      .into(RoleEntity)
      .values([
        // { name: 'admin', short_description: 'Администратор', long_description: 'Полные права доступа на все модели' },
        { name: 'security', short_description: 'Защитник информации', long_description: 'Пользователь с доступом к категориям' },
        { name: 'factory', short_description: 'Гость', long_description: 'Пользователь завода с правами на чтение' },
        { name: 'manager', short_description: 'Менеджер', long_description: 'Пользователь с доступом к инвентаризации, но без категории' }
      ])
      .execute()

    // Создание пользователя с ролью "Администратор"
    await factory(UserEntity)()
      .map(async (user) => {
        user.role = roleAdmin;

        return user;
      })
      .create();

  }
}