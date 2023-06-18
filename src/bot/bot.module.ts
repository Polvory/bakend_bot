import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Job } from '../job/job.model';

@Module({
  providers: [BotService],
  controllers: [BotController],
  imports:[
    SequelizeModule.forFeature([Job]),
  ]
})
export class BotModule {}
