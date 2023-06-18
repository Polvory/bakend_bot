import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateJobDto } from './dto/job_create.dto';
import { Job } from './job.model';
import { ParserService } from '../parser/parser.service';

@Injectable()
export class jobService {
    constructor( 
        @InjectModel(Job) private JobRepository: typeof Job,
        private parserService: ParserService
        ){}

    async get(){
        try {
            let res = await this.JobRepository.findAll()
            return res
        } catch (error) {
            return error
        }
    }

    async create(dto:CreateJobDto){
        let new_job = await this.JobRepository.create(dto)
        return new_job
    }
    

      
    async test_parser(){
        let res = await this.parserService.getHabr()
        
        return res
    }
}