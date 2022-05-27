import { RolesGuard } from './../auth/guards/roles.guard';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './../shared/decorators/roles.decorator';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './../entities/main/user.entity';
import { UserService } from './user.service';
import { Body, Controller, Get, Header, HttpCode, HttpException, HttpStatus, Logger, Post, Delete, Put, Response, UsePipes, ValidationPipe, Param, UseFilters, UseGuards, SetMetadata } from '@nestjs/common';
import { I18n, I18nContext, I18nValidationExceptionFilter, i18nValidationErrorFactory } from 'nestjs-i18n';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {

  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  @Roles('admin')
  async getUsers(@Response() res) {
    res.send(await this.userService.findAll());

    // await this.userService.findAll()
    // .then((users) => {
    //   console.log('users', users);

    //   res.send(users);
    // })
  }

  @Get('new')
  async new(
    @Body() body,
    @Response() res
  ) {

    // TODO: Добавить сообщение об ошибке пользователю
    await this.userService.findAllRoles()
      .then((roles) => {
        res.send(roles);
      })
  }

  @Post('create')
  // @UsePipes(new ValidationPipe({transform: true, exceptionFactory: i18nValidationErrorFactory}))
  async create(
    @Body() create_user:CreateUserDto,
    @Response() response,
    @I18n() i18n: I18nContext
  ) {
    const new_user = await this.userService.create(create_user);

    // response.send(new_user);

    return response.status(HttpStatus.OK).json({
      message: i18n.t('controller.USER.CREATE.created'),
      user: new_user,
    });
  }

  @Delete(':id/delete')
  async delete(
    @Param('id') id: number,
    @Response() response,
    @I18n() i18n: I18nContext
  ) {
    const delete_user = await this.userService.deleteUser(id);
    // response.send(delete_user);

    return response.status(HttpStatus.OK).json({
      message: i18n.t('controller.USER.DELETE.deleted'),
      user: delete_user,
    });
  }

  @Get(':id/edit')
  async edit(
    @Body() body,
    @Param('id') id: number,
    @Response() response
  ) {
    const user = await this.userService.editUser(id);

    response.send(user);
  }

  @Put(':id/update')
  async update(
    @Param('id') id: number,
    @Body() user: UpdateUserDto,
    @Response() response,
    @I18n() i18n: I18nContext
  ) {
    await this.userService.updateUser(id, user);

    return response.status(HttpStatus.OK).json({
      message: i18n.t('controller.USER.UPDATE.updated')
    });
  }

}
