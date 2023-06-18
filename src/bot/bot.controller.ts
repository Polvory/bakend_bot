import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_LINK } from '../utils/dev'
import { BotService } from './bot.service';


@ApiTags('Бот')
@Controller(`${API_LINK}/bot`)
export class BotController {
    constructor(private botService: BotService){}


    @ApiOperation({ summary: 'Отправить в чат' })
    @ApiResponse({ status: 200 })
    @Get('/send')
    @HttpCode(HttpStatus.OK)
    get() {
        return this.botService.send_job()
    }
}
