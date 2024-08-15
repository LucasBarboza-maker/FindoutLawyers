export type LogEngineLevel = 'error' | 'info' | 'success' | 'warning'

export type LogEngineMessageBody = string | Record<any, any> | Array<any>

export interface LogEngineClassProps {
   filename?: string
   prefix?: string;
   hide?: LogEngineLevel[]
   folder?: string;
   isUnique?: boolean;
}


export type LogEngineLogContext = {
   prefix: string;
   code: string;
   body: LogEngineMessageBody;
   date: string;
   level: LogEngineLevel;

}
