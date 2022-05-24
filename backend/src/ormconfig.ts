import { RoleEntity } from './entities/main/role.entity';
require("dotenv").config({ path: '/app/.env' });

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { UserEntity } from './entities/main/user.entity';


export = [
  {
    name: 'default',
    type: 'mysql',
    host:  process.env.MYDQL_HOST,
    port:  parseInt(process.env.MYSQL_PORT, 10) || 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,

    entities: [RoleEntity, UserEntity],
    // entities: ['src/entities/main/*.entity.{ts,js}'],

    synchronize: false,
    logging: true,

    migrations: [join(__dirname, '..', 'migrations/*.{ts,js}')],
    // migrations: ['src/migrations/**/*.ts'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true
  } as TypeOrmModuleOptions,
  {
    name: 'reference',
    type: 'mysql',
    host:  process.env.MYDQL_HOST,
    port:  parseInt(process.env.MYSQL_PORT, 10) || 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: ['src/entities/main/*.entity.{ts,js}'],

    synchronize: false,
    logging: true,

    migrations: ['src/migrations/**/*.ts'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true
  } as TypeOrmModuleOptions,
];