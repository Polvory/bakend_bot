import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {DB_NAME, DB_PASSWORD, DB_USER, DB_PORT} from './utils/dev'
@Module({
  controllers: [],
  providers: [],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      models: [ 

      ],
      autoLoadModels: true
    }),
  ],


})
export class AppModule { }
