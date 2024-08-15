/*
:--------------------------------------------------------------------------
: Get out the cookie token that indicates if the user is online or not.
:--------------------------------------------------------------------------
*/

export function CookiesGetXUserTokenAccess(request: any): string {
   let rawHeaders = request.headers.cookie as string;
   rawHeaders += ';';
   const hasUserToken = /(x-user-token=(.*?)((;|\n)\s?))/gimu.test(rawHeaders);
   if (!hasUserToken) {
      return '';
   }

   const getCookie = /(x-user-token=(.*?)((;|\n)\s?))/gimu.exec(rawHeaders);
   return !!getCookie ? getCookie[2] : '';
}
