import FileType from 'file-type';
import { UtilsString } from "@/libraries/utils";
import { basename, extname } from 'path'
import { PublicRoute } from '@/server/path';



/**
 * For the route: enterprise/user/register
 */

interface UploadSinglePictureProps {
   fileImagePath: string | null | undefined,
   id: string,
   folder: string;
   routeFolder: string;
}
/**
 *
 * @param folder use / as prefix : /users/cover
 * @param routeFolder if folder is users, then routeName is users
 * @returns
 */
export async function UploadSinglePicture(
   {
      fileImagePath,
      id,
      folder,
      routeFolder
   }: UploadSinglePictureProps
): Promise<string | undefined> {
   if (!fileImagePath) return;
   try {

      const imagePath = `${folder}/${basename(
         fileImagePath
      )}`;

      const idFilename = id

      let baseFilename = `${idFilename}`;

      const getType = await FileType.fromFile(fileImagePath);

      if (!!getType) {
         baseFilename = `${baseFilename}.${getType.ext}`
      } else {
         baseFilename = `${baseFilename}.${extname(fileImagePath)}`
      }

      const imageCoverPath = PublicRoute.plug(
         routeFolder,
         `${baseFilename}`
      );




      const imageCoverPathDB = `public/uploads/${folder}/${baseFilename}`;

      const hasCopy = await PublicRoute.io().copy(
         PublicRoute.plug('main', imagePath),
         imageCoverPath
      );

      const hasImg = await PublicRoute.io().accessFile(
         PublicRoute.plug('main', imagePath)
      );

      if (!!hasImg) {
         await PublicRoute.io().remove({
            routeName: 'main',
            filename: imagePath,
         });
      }

      return imageCoverPathDB
   } catch (error) {

      console.error(error)
      return undefined
   }

}
