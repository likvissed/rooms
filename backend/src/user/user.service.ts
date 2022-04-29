import { HrService } from './../hr/hr.service';
import { Role } from './../entities/main/role.entity';
import { User } from './../entities/main/user.entity';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { map, switchMap, throwError, catchError, of } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

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

  insert(user): any{

    // let role = await this.roleRepository.findOne({ id: user.role_id });

    return this.hrService.findByTn(user.tn)
      .pipe(
        map(response => {
          // console.log('response[0]', response[0]);
          return response[0];
        }),
        catchError(error=> {
          console.log('error', error);
          return of(`Пользователь с табельным номером ${user.tn} не существует`)
          // throw new HttpException(`Пользователь с табельным номером ${user.tn} не существует`, HttpStatus.NOT_FOUND)

        }),
        map(hr_user => {
          // console.log('hr_user', hr_user);
          if (hr_user && user.role_id) {
            this.saveUser(user.role_id, hr_user);

            return true;
          } else {
            return false;
          }
        })
      )
  }

  async saveUser(role_id, hr_user) {
    let role = await this.roleRepository.findOne({ id: role_id });

    const new_user = new User();
  
    new_user.tn = hr_user.personnelNo;
    new_user.id_tn = hr_user.id;
    new_user.phone = hr_user.phoneText;
    new_user.fullname = hr_user.fullName;
    new_user.role = role;

    // return getRepository(User).save(new_user);
    return true

  }

  async saves(role_id, tn) {
    let issuccess = false;

    await this.hrService.findByTn(tn)
      .subscribe(response => {   
        if (response[0]) {
          return issuccess = false;
        } else {
          return issuccess = true;
        }
      },
        (er) => {

          return issuccess = false;
        });
          return issuccess ;

  }

}
