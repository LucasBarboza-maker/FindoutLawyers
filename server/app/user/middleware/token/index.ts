import { User_Method_VerifyToken } from '../../method/token';
import { UserMiddlewareTokenProps } from '@/types/user/TypesMiddlewareToken';
import { CookiesGetXUserTokenAccess } from '@/app/cookies/index';
import { TUserMiddlwareResult } from '@/types/user/TypeUserProfile';

import {
    ReplyUserAccount_Banned,
    ReplyUserAccount_UnathorizedRole,
} from '@/routes/reply/user/account';

import {
    ReplyUserCookies_ErrorRetrieveXUserToken,
    ReplyUserCookies_ErrorInvalidXUserToken,
} from '@/routes/reply/user/cookies';

import { ReplyUserDB_InvalidAccount } from '@/routes/reply/user/db';

/*
:--------------------------------------------------------------------------
: @token
: | Checkout if the user is ON with the x-user-token and returns the object
: | with the data from user
:--------------------------------------------------------------------------
*/

export async function User_Middleware_Token({
    request,
    reply,
    prisma,
    isRawHeader = false,
    role = 'ALL',
    onlyGet = false,
    include,
}: UserMiddlewareTokenProps): Promise<TUserMiddlwareResult | null> {
    const getXUserToken: string = !isRawHeader
        ? (request.headers['x-user-token'] as string)
        : CookiesGetXUserTokenAccess(request);

    if (!getXUserToken) {
        return !!onlyGet
            ? null
            : ReplyUserCookies_ErrorRetrieveXUserToken(reply);
    }

    let decodedToken = await User_Method_VerifyToken(getXUserToken);

    if (!decodedToken || !decodedToken.email) {
        return !!onlyGet
            ? null
            : ReplyUserCookies_ErrorInvalidXUserToken(reply);
    }

    const user = await prisma.user.findFirst({
        where: { email: decodedToken.email },
        include,
    });

    if (!user) {
        return !!onlyGet ? null : ReplyUserDB_InvalidAccount(reply);
    }

    if (user.isBlockedToAccess === true) {
        return !!onlyGet ? null : ReplyUserAccount_Banned(reply);
    } else if (!!role && role !== 'ALL' && user.role !== role) {
        return !!onlyGet ? null : ReplyUserAccount_UnathorizedRole(reply);
    }

    return user;
}
