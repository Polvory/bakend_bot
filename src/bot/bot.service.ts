import { Injectable } from '@nestjs/common';
import { BOT_TOKEN, CHAT_SEND} from '../utils/dev'
import { Telegram } from 'telegraf';
import { Job } from '../job/job.model';
import { InjectModel } from '@nestjs/sequelize';
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class BotService {

    private readonly bot: Telegram = new Telegram(BOT_TOKEN)
    constructor(
        @InjectModel(Job) private JobsRepository: typeof Job,
    ) { }

    @Cron(CronExpression.EVERY_30_MINUTES_BETWEEN_10AM_AND_7PM)
    async send_job() {
        let list_job = await this.JobsRepository.findAll({ limit: 3,where:{is_send:false}, order: [['createdAt', 'DESC']] })


        if (list_job.length) {
            for (let i = 0; i < list_job.length; i++) {

                let send = await this.bot.sendMessage(CHAT_SEND, `
 <b>💚 ${list_job[i].title}</b>
 <b>${list_job[i].company}</b>

 ${list_job[i].description.slice(0, 300)}...`, {
                    parse_mode: 'HTML', disable_web_page_preview: true,
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Смотреть 👀', url: `${list_job[i].link}` }],

                        ],
                    },
                })
               let send_true = await this.JobsRepository.findOne({where:{id:list_job[i].id}})
               send_true.is_send = true
               await send_true.save()
     

            }

        }
        return list_job
    }

}
