require("dotenv").config({ path: '/app/.env' });

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';


export = [
  {
    name: 'default',
    type: 'mysql',
    host:  process.env.MYDQL_HOST,
    port:  parseInt(process.env.MYSQL_PORT, 10) || 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,

    entities: [__dirname + '/**/*.entity.{js,ts}'],   

    synchronize: false,
    logging: true,

    migrations: [join(__dirname, '..', 'migrations/*.{ts,js}')],
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