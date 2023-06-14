import { ApiProperty } from "@nestjs/swagger";
import { Model,Table,Column,DataType, HasMany ,BelongsToMany } from "sequelize-typescript";
import {DataTypes} from 'sequelize'

interface UsersCreationAttrs {
    id:string;
    tg_id:string;
    ban:boolean;
    send:boolean;
}


@Table({tableName: 'users'})
export class Users extends Model<Users, UsersCreationAttrs>{
    @ApiProperty({example: '649127d5-574e-4680-b527-311b1742e908', description: 'Уникальный идентификатор'})
    @Column({type: DataTypes.UUID,   defaultValue: DataTypes.UUIDV4,   allowNull:false, primaryKey: true})
    id:string;

    @ApiProperty({example: '649127', description: 'Уникальный идентификатор в телеграмм'})
    @Column({type:DataType.TEXT})
    tg_id:string;

    @ApiProperty({example: false, description: 'Забанить пользователя'})
    @Column({type:DataType.BOOLEAN, allowNull:false, defaultValue:false })
    ban:boolean;

    @ApiProperty({example: false, description: 'Отправлять вакансии'})
    @Column({type:DataType.BOOLEAN, allowNull:false, defaultValue:true })
    send:boolean;
    
}