import { Role } from './../../Interfaces/main/role.interface';

export const roles: Role[] = [
  {
    name: 'admin',
    short_description: 'Администратор',
    long_description: 'Полные права доступа на все модели'
  },
  {
    name: 'security',
    short_description: 'Защитник информации',
    long_description: 'Пользователь с доступом к категориям'
  },
  {
    name: 'factory',
    short_description: 'Пользователь завода',
    long_description: 'Пользователь завода с правами на чтение'
  },
  {
    name: 'manager',
    short_description: 'Менеджер',
    long_description: 'Пользователь с доступом к инвентаризации, но без категории'
  } 
];