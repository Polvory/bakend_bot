import { ApiProperty } from "@nestjs/swagger";
import {IsString,IsNotEmpty, IsBoolean} from 'class-validator'


export class CreateJobDto{


    @ApiProperty({example: 'Тинькофф', description: 'Компания'})
    @IsNotEmpty()
    @IsString() 
    company:string;

    @ApiProperty({example: '150 000р', description: 'ЗП'})
    @IsString()
    grade:string;

    @ApiProperty({example: 'UI/UX дизайнер ("Чемпионат")', description: 'Вкансия'})
    @IsNotEmpty()
    @IsString() 
    title:string;


    @ApiProperty({example: 'false', description: 'Описание'})
    @IsNotEmpty()
    @IsString() 
    description:string;

    @ApiProperty({example: 'false', description: 'Ссылка'})
    @IsNotEmpty()
    @IsString() 
    link:string;

    @ApiProperty({example: false, description: 'Отправлено'})
    @IsNotEmpty()
    @IsBoolean()
    is_send:boolean;
}