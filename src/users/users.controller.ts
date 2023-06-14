import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUsersDto } from './dto/user_create.dto';
import { UsersService } from './users.service';
import {API_LINK} from '../utils/dev'



@ApiTags('Пользователи')
@Controller(`${API_LINK}/users`)
export class UsersController {
    constructor(private usersService: UsersService){}

    @ApiOperation({ summary: 'Получение' })
    @ApiResponse({ status: 200 })
    @Get('/list')
    @HttpCode(HttpStatus.OK)
    get() {
        return this.usersService.get()
    }
    
    @ApiOperation({ summary: 'Создание' })
    @ApiResponse({ status: 201, type:CreateUsersDto })
    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto:CreateUsersDto) {
        return this.usersService.create(dto)
    }
    // @ApiOperation({ summary: 'Редактирование' })
    // @ApiResponse({ status: 201 })
    // @Post('/edit')
    // @HttpCode(HttpStatus.OK)
    // edit(@Body() dto:EditUsersDto) {
    //     return this.usersService.edit(dto)
    // }

}