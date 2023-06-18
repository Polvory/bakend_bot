import { ApiProperty } from "@nestjs/swagger";
import { Model,Table,Column,DataType, HasMany ,BelongsToMany } from "sequelize-typescript";
import {IsString,IsNotEmpty, IsBoolean} from 'class-validator'
import {DataTypes} from 'sequelize'


interface JobCreationAttrs {
    id:string;
    company:string;
    grade:string;
    description:string;
    link:string;
    is_send:boolean;
}


@Table({tableName: 'job'})
export class Job extends Model<Job, JobCreationAttrs>{
    @ApiProperty({example: '649127d5-574e-4680-b527-311b1742e908', description: 'Уникальный идентификатор'})
    @Column({type: DataTypes.STRING,   defaultValue: DataTypes.UUIDV4,   allowNull:false, primaryKey: true})
    @IsNotEmpty()
    @IsString() 
    id:string;

    @ApiProperty({example: 'Тинькофф', description: 'Компания'})
    @Column({type:DataType.TEXT})
    @IsNotEmpty()
    @IsString() 
    company:string;

    @ApiProperty({example: 'UI/UX дизайнер ("Чемпионат")', description: 'Вкансия'})
    @Column({type:DataType.TEXT})
    @IsNotEmpty()
    @IsString() 
    title:string;

    @ApiProperty({example: '150 000р', description: 'ЗП'})
    @Column({type:DataType.TEXT}) 
    @IsString()
    grade:string;

    @ApiProperty({example: 'false', description: 'Описание'})
    @Column({type:DataType.TEXT })
    @IsNotEmpty()
    @IsString() 
    description:string;

    @ApiProperty({example: 'false', description: 'Ссылка'})
    @Column({type:DataType.TEXT})
    @IsNotEmpty()
    @IsString() 
    link:string;

    @ApiProperty({example: false, description: 'Отправлено'})
    @Column({type:DataType.BOOLEAN, allowNull:false, defaultValue:false })
    @IsNotEmpty()
    @IsBoolean()
    is_send:boolean;

}