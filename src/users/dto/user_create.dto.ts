import { ApiProperty } from "@nestjs/swagger";


export class CreateUsersDto{

    @ApiProperty({example: '6491275', description: 'Уникальный идентификатор'})
    readonly tg_id:string;

    @ApiProperty({example: false, description: 'бан'})
    readonly ban:boolean;

}