import { Injectable } from "@nestjs/common";
import { HABR, HABR_PAGE } from '../utils/links_parser'
import * as needle from 'needle'
import * as cheerio from 'cheerio'
import { InjectModel } from "@nestjs/sequelize";
import { Job } from "../job/job.model";
import { CreateJobDto } from "../job/dto/job_create.dto";
import { Cron, CronExpression } from '@nestjs/schedule'


@Injectable()
export class ParserService {

    constructor(@InjectModel(Job) private JobsRepository: typeof Job
    ) {
    }


    @Cron(CronExpression.EVERY_2_HOURS)
    async getHabr() {
        const JobsData = this.JobsRepository
        needle.get(HABR, function (error, response) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(response.body);

                $('.vacancy-card__title-link').each((index, value) => {
                    let href = $(value).attr('href')
                    let linkVacancy = `${HABR_PAGE}${href}`
                    needle.get(linkVacancy, async function (error, response) {
                        let pauloud: CreateJobDto = {
                            company: '',
                            title: '',
                            grade: '',
                            link: linkVacancy,
                            description: '',
                            is_send: false
                        }

                        if (!error && response.statusCode == 200) {
                            var $ = cheerio.load(response.body);

                            pauloud.title = $('.page-title__title').text()
                            pauloud.company = $('.company_name').text()

                            $('.vacancy-description__text').children().each((index, value) => {

                                pauloud.description += `${$(value).text()}\n`


                            })
                        }
                        let Validate = await JobsData.findAll({ where: { company: pauloud.company, title: pauloud.title, link: linkVacancy } })

                        if (Validate.length <= 0 && pauloud.title != '' && pauloud.company != '' && pauloud.link != '') {
                            await JobsData.create(pauloud)
                            console.log('Добавляем в бд')
                        } else {
                            console.log('Такая ваканися есть, идем дальше')
                        }
                    })
                })
            }
        })
    }

}