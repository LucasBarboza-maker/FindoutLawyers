import { FilenameSaveFormat as saveFilename } from '@/libraries/utils/string';
import { LogEngineClassProps, LogEngineLevel, LogEngineLogContext, LogEngineMessageBody } from '@/server/@types/logEngine';
import { DataRoute } from '@/server/path';
import chalk from 'chalk'

/*
:--------------------------------------------------------------------------
: Setup of LogEngine
:--------------------------------------------------------------------------
*/



export class LogEngine {

   filename: string;
   prefix: string;
   logs: LogEngineLogContext[];
   hide: LogEngineLevel[]
   folder?: string;
   isUnique: boolean;

   constructor({
      filename = 'default',
      prefix = '*',
      hide = [],
      folder,
      isUnique = false
   }: LogEngineClassProps) {
      this.filename = saveFilename(`${filename}.${Date.now()}`);
      this.prefix = prefix;
      this.logs = [];
      this.hide = hide;
      this.folder = !!folder ? folder : filename
      this.isUnique = isUnique
      DataRoute.io().setFolder('logs', this.folder)
   }

   hasHide(level: LogEngineLevel) {
      return this.hide.includes(level);
   }

   setFilename(value: string) {
      this.filename = `${saveFilename(value)}`;
   }

   getFilename() {
      const id = this.isUnique ? '' : `.${Date.now()}`
      return `${this.folder}/${this.filename}${id}.json`
   }

   set(level: LogEngineLevel, body: LogEngineMessageBody, code: string) {
      const date = new Date()
      this.logs.push({
         level,
         body,
         prefix: this.prefix,
         date: date.toUTCString(),
         code
      })
   }

   info(body: LogEngineMessageBody, code?: string) {
      if (!this.hasHide('info')) {
         console.log(
            chalk.magentaBright.bold(`<${this.filename} ${this.prefix}/>`),
            chalk.blueBright((`INFO - ${code || '*'}`)),

            chalk.blue(body)
         )
      }
      this.set('info', body, code || '*')
   }

   warning(body: LogEngineMessageBody, code?: string) {
      if (!this.hasHide('warning')) {
         console.log(
            chalk.magentaBright.bold(`<${this.filename} ${this.prefix}/>`),
            chalk.yellowBright((`WARNING - ${code || '*'}`)),

            chalk.yellow(body)
         )
      }
      this.set('warning', body, code || '*')
   }

   error(body: LogEngineMessageBody, code?: string) {
      if (!this.hasHide('error')) {
         console.log(
            chalk.magentaBright.bold(`<${this.filename} ${this.prefix}/>`),
            chalk.redBright((`ERROR - ${code || '*'}`)),

            chalk.red(body)
         )
      }
      this.set('error', body, code || '*')
   }

   success(body: LogEngineMessageBody, code?: string) {
      if (!this.hasHide('success')) {
         console.log(
            chalk.magentaBright.bold(`<${this.filename} ${this.prefix}/>`),
            chalk.greenBright((`SUCCESS - ${code || '*'}`)),

            chalk.green(body)
         )
      }
      this.set('error', body, code || '*')
   }


   async save() {

      try {
         const data = await this.getSavedLogs();

         await DataRoute.stream().writeFile({
            destination: DataRoute.plug('logs', this.getFilename()),
            data: JSON.stringify([this.logs, ...data]),
            options: 'utf-8'
         })

      } catch (error) {
         console.error(error)
      }

   }

   private async getSavedLogs(): Promise<LogEngineLogContext[]> {
      try {
         const hasFile = await DataRoute.io().accessFile(DataRoute.plug('logs', this.getFilename()));
         if (!hasFile) {
            return []
         };

         const { data } = await DataRoute.stream().readJson({ filepath: DataRoute.plug('logs', this.getFilename()), options: 'utf-8' });

         if (!Array.isArray(data)) return [];

         return data as any[];
      } catch (error) {
         return []
      }
   }
}
