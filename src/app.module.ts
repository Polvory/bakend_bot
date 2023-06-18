import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';
import {DB_NAME, DB_PASSWORD, DB_USER, DB_PORT} from './utils/dev'
import { UsersModule } from './users/users.module';
import { Job } from './job/job.model';
import { jobModule } from './job/job.module';
import { BotModule } from './bot/bot.module';
@Module({
  controllers: [],
  providers: [],
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      models: [ 
        Job
      ],
      autoLoadModels: true
    }),
    UsersModule,
    jobModule,
    BotModule,
    
  ],
  

})
export class AppModule { }
