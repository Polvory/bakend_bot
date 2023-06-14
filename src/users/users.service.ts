import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUsersDto } from './dto/user_create.dto';
@Injectable()
export class UsersService {
    async get(){
        return 200
    }
    async create(dto:CreateUsersDto){
        return 200
    }

}