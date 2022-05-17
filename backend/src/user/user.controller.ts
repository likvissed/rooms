import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './../entities/main/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, Logger, Post, Response, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('users')
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
    const new_user = await this.userService.create(create_user);

    response.send(new_user);
  }

}
