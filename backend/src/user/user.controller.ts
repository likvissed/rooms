import { CreateUserDto } from './dto/create-user.dto';
import { User } from './../entities/main/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Response, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Get('new')
  async new(@Body() body, @Response() res) {

    // TODO: Добавить сообщение об ошибке пользователю
    await this.userService.findAllRoles()
      .then((roles) => {
        res.send(roles);
      })
  }

  @Post('create')
  @UsePipes(new ValidationPipe({transform: true}))
  async create(@Body() create_user: CreateUserDto, @Response() response) {

    console.log('create', create_user);

    await this.userService.insert(create_user)
      .subscribe(data => {
        Logger.warn(data); 

        response.send(data)
        
        // if (data) {
        //   response.send(data)
        // } else {
        //   throw new HttpException(`Пользователь с табельным номером 1212 не существует`, HttpStatus.NOT_FOUND)
        // }
      },
        (error) => {
          console.log('My err', error);
          return error.response;
        })

  }

}
