import { Injectable } from "@nestjs/common";
import { HABR, HABR_PAGE, DESIGNER ,DESIGNER_PAGE} from '../utils/links_parser'
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

    @Cron(CronExpression.EVERY_4_HOURS)
    async getDesigner() {
        console.log('загрузка Designer... ')
        const JobsData = this.JobsRepository
        needle.get(DESIGNER, function (error, response) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(response.body);
                $('.z_bx00kk__i').each((index, value) => {
                    let href = $(value).children().children('a').attr('href')
                    let linkVacancy = `${DESIGNER_PAGE}${href}`
                    needle.get(linkVacancy, async function (error, response) {
                        var $ = cheerio.load(response.body);
                        let pauloud = {
                            company: '',
                            title: '',
                            grade: '',
                            link: linkVacancy,
                            description: '',
                            is_send: false
                        
                        }
                        pauloud.title =  $('h1').text()
                        pauloud.company =  $('.z_b_72194kjs___intro_v2__www').children('a').text().replace(/\\n/g, '')
                    //    / pauloud.description =  $('z_b_72194kjs_2_body_inner').text().replace(/\\n/g, '')
                        $('.z_b_72194kjs_2_body_inner').children().each((index, value) => {

                            pauloud.description += `${$(value).text().replace(/\s+/g, " ")}\n`


                        })

                        console.log(pauloud)
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