import { User } from './../entities/main/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findUser(tn: number): Promise<any>{
    return await this.userRepository.find({
      join: { alias: "user", leftJoinAndSelect: { role: "user.role" } }, where : { tn : tn }
    })
  }

}
