import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {API_LINK} from '../utils/dev'
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Headers } from '@nestjs/common'
import {jobService} from './job.service'
import { CreateJobDto } from './dto/job_create.dto'


@ApiTags('Вакнсии')
@Controller(`${API_LINK}/job`)
export class JobController {
    constructor(private jobService: jobService){}

    @ApiOperation({ summary: 'Получение' })
    @ApiResponse({ status: 200, type:[CreateJobDto] })
    @Get('/list')
    @HttpCode(HttpStatus.OK)
    get(@Headers() headers) {
        return console.log('AUTHH LOGG', headers.host)
        // return this.jobService.get()
    }
    // async login () {
        
    //   }

    @ApiOperation({ summary: 'Создание' })
    @ApiResponse({ status: 200, type:CreateJobDto })
    @Post('/list')
    @HttpCode(HttpStatus.OK)
    create(@Body()  dto:CreateJobDto) {
        return this.jobService.create(dto)
    }


    @ApiOperation({ summary: 'test_parser' })
    @ApiResponse({ status: 200})
    @Get('/test_parser')
    @HttpCode(HttpStatus.OK)
    test_parser() {
        return this.jobService.test_parser()
    }
    

}