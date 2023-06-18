import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {API_LINK} from '../utils/dev'
import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common'
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
    get() {
        return this.jobService.get()
    }


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