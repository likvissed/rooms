import { HrService } from './../hr/hr.service';
import { RoleEntity } from './../entities/main/role.entity';
import { UserEntity } from './../entities/main/user.entity';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { map, switchMap, throwError, catchError, of } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,

    private hrService: HrService
  ) {}

  async findUser(tn: number): Promise<any>{
    return await this.userRepository.find({
      join: { alias: "user", leftJoinAndSelect: { role: "user.role" } }, where : { tn : tn }
    })
  }

  async findAllRoles(): Promise<any>{
    return await this.roleRepository.find();
  }

  async create(user): Promise<any> {

    const peresent_user = await this.userRepository.findOne({
      tn: user.tn
    });

    if (peresent_user != undefined) {
      throw new HttpException('Пользователь уже существует', HttpStatus.FOUND);
    }

    let role = await this.roleRepository.findOne({ id: user.role_id });

    if (!role) {
      throw new HttpException('Выбранная роль не существует', HttpStatus.BAD_REQUEST,
      );
    }

    const current_user = await this.hrService.findByTn(user.tn)
    if (!current_user) {
      throw new HttpException(`Пользователь с табельным номером ${user.tn} не существует`, HttpStatus.NOT_FOUND);
    }

    const new_user = new UserEntity();
  
    new_user.tn = current_user.personnelNo;
    new_user.id_tn = current_user.id;
    new_user.phone = current_user.phoneText ? current_user.phoneText : '';
    new_user.fullname = current_user.fullName;
    new_user.role = role;

    return await getRepository(UserEntity).save(new_user);
  }

  async findAll(): Promise<any> {
    return this.userRepository.find({ relations: ['role'] });
  }

  async deleteUser(id: number): Promise<any> {
    const user = await this.userRepository.findOne({
      id: id
    });

    if (!user) {
      throw new HttpException('Пользователь уже удален', HttpStatus.FOUND);
    }

    await this.userRepository.delete({ id });
    return { message: 'Пользователь удален' };
  }

  async editUser(id: number): Promise<any> {
    let data = {};

    data['user'] = await this.userRepository.findOne({
      id: id
    });

    data['roles'] = await this.findAllRoles();
   
    console.log('data', data);
    return data;
  }

  async updateUser(id, user): Promise<any> {
    const present_user = await this.userRepository.findOne({
      id: id
    });

    if (!present_user) {
      throw new HttpException(`Пользователь с табельным номером ${user.tn} не существует`, HttpStatus.NOT_FOUND);
    }

    present_user.role_id = user.role_id;

    return await this.userRepository.save(present_user);
  }


}
