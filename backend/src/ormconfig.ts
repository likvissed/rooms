require("dotenv").config({ path: '/app/.env' });

import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions = {
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
  migrationsRun: true,
}

export default config;
