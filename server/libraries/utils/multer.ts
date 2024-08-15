import multer from 'fastify-multer';
import path from 'path';
import { PublicRoute } from '@/server/path';

/*
:--------------------------------------------------------------------------
: @multer handler
:--------------------------------------------------------------------------
*/

type TMulterDefault = typeof multer.default;

export const IOMulter: TMulterDefault = multer.default;

export type DiskStorageProps_File = {
   fieldname: string;
   originalname: string;
   enconding: string;
   mimetype: string;
   size: number;
   destination: string;
   filename: string;
   path: string;
   buffer: Buffer;
};

interface DiskStorageProps {
   filepath: string;
   control?: any;
   folder?: string;
   onFilename?: (request: any, file: DiskStorageProps_File) => string;
   extension?: string;
}

export function diskStorage({
   filepath = 'tmp',
   control = Date.now(),
   folder = PublicRoute.get('root').filepath,
   onFilename,
   extension
}: DiskStorageProps): any {
   return IOMulter.diskStorage({
      destination: function (request, file, callback) {
         callback(null, path.join(folder, filepath));
      },
      filename: function (request, file, callback) {
         if (!!onFilename) {
            const str = onFilename(request, file as any);
            callback(null, str);
         }
         const ext = !!extension ? extension : path.extname(file.originalname);
         const name = path.basename(file.originalname, ext);
         callback(null, `${name}-${control}${ext}`);
      },
   });
}
