import { PrismaClient } from '@prisma/client';
import { Encrypt_CryptSalt } from '@/libraries/utils/encrypt';
import { EMAIL_MAIN_ACCOUNT } from '@/server/config/email/config';

/*
:--------------------------------------------------------------------------
: @admin
: | Create the default admin user
:--------------------------------------------------------------------------
*/

export async function UserCreateAdminSystem(
    prisma: PrismaClient
): Promise<Boolean> {
    // await prisma.user.delete({ where: { email: MAIN_ACCOUNT_EMAIL } });

    const password = await Encrypt_CryptSalt('!senha060653', 5);

    await prisma.user.upsert({
        where: {
            email: EMAIL_MAIN_ACCOUNT,
        },
        create: {
            email: EMAIL_MAIN_ACCOUNT,
            password,
            name: 'System',
            surname: 'Admin',
            imageCover: 'public/uploads/users/cover/default.png',
            category: 'STAFF',
            role: 'ADMIN',
            isRequestingToAccess: false,
            isRequestingToDefinePassword: false,
            isBlockedToAccess: false,
            settings: {
                create: {},
            },
            evaluation: {
                create: {},
            },
        },
        update: {},
    });

    console.log('Upserting Main Account', EMAIL_MAIN_ACCOUNT);

    return true;
}
