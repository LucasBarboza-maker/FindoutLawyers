import chalk from 'chalk'
import { GlobalTaskLogSeverityType } from '@/types/globalTasks/log'

export const COLOR_LOG = {
   info: chalk.blueBright,
   success: chalk.greenBright,
   error: chalk.redBright,
   warning: chalk.yellowBright
}

export function print(title: string, message: string, severity: GlobalTaskLogSeverityType = 'info') {

   const chalkColor = COLOR_LOG[severity || 'info'] || chalk.cyanBright

   console.log(
      chalkColor(`${title}$[${severity.toUpperCase()}]:\t`),
      message
   )
}
