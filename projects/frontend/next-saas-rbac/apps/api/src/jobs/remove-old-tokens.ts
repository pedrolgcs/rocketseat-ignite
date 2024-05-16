import { CronJob } from 'cron'
import dayjs from 'dayjs'

import { prisma } from '@/lib/prisma'

export const removeOldTokensJob = CronJob.from({
  cronTime: '0 0 * * *', // Every day at midnight,
  onTick: async function () {
    const yesterday = dayjs().subtract(1, 'day').endOf('day').toDate()

    await prisma.token.deleteMany({
      where: {
        createdAt: {
          lt: yesterday,
        },
      },
    })
  },
  timeZone: 'America/Sao_Paulo',
})
