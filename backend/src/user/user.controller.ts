import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './../entities/main/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, Logger, Post, Delete, Response, UsePipes, ValidationPipe, Param } from '@nestjs/common';

@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  async getUsers(@Response() res) {
    res.send(await this.userService.findAll());

    // await this.userService.findAll()
    // .then((users) => {
    //   console.log('users', users);

    //   res.send(users);
    // })
  }

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

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Response() response
  ) {
    const delete_user = await this.userService.deleteUser(id);

    response.send(delete_user);
  }

}
