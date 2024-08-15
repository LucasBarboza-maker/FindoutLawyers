import { IBootstrap_Routes } from '@/types/routes';
import { UserCreateAdminSystem } from '../user/admin';
import { CreateDefaultBanners } from './banners';

/*
:--------------------------------------------------------------------------
: Bootstrap right at the start of the Server
:--------------------------------------------------------------------------
*/

export async function StartPoint({
    prisma,
    redis,
    socket,
    fastify,
}: IBootstrap_Routes): Promise<void> {
    await UserCreateAdminSystem(prisma);
    CreateDefaultBanners(prisma).then(console.log).catch(console.error);

    return;
}
