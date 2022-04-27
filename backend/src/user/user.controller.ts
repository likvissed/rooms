import { Body, Controller, Get, Post, Response } from '@nestjs/common';

@Controller('user')
export class UserController {

  @Get('new')
  async new(@Body() body, @Response() res) {

    console.log('new');

    res.send({
      tn: '',
      roles: [
        'worker',
        'admin'
      ]
    })

  }

  @Post('create')
  async create(@Body() body, @Response() res) {

    console.log('create');

    res.send({
      result: 'ok'
    })

  }

}
