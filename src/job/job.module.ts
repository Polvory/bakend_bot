import { SequelizeModule } from "@nestjs/sequelize";
import { JobController } from "./job.controller";
import { Job } from "./job.model";
import { jobService } from "./job.service";
import { Module } from "@nestjs/common";
import { ParserService } from "../parser/parser.service";




@Module({
    controllers: [JobController],
    providers: [jobService, ParserService],
    imports:[
      SequelizeModule.forFeature([Job]),
    ]
  })
  export class jobModule {}