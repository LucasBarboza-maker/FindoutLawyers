import { PrismaClient } from '@prisma/client';

export async function CreateDefaultBanners(prisma: PrismaClient) {
    try {
        await prisma.$transaction([
            prisma.banners.upsert({
                where: { page: 'HOME_A' },
                create: { page: 'HOME_A', name: 'Homepage A' },
                update: {},
            }),
            prisma.banners.upsert({
                where: { page: 'HOME_B' },
                create: { page: 'HOME_B', name: 'Homepage B' },
                update: {},
            }),
            prisma.banners.upsert({
                where: { page: 'SEARCH_A' },
                create: { page: 'SEARCH_A', name: 'Pesquisa Horizontal' },
                update: {},
            }),
            prisma.banners.upsert({
                where: { page: 'SEARCH_B' },
                create: { page: 'SEARCH_B', name: 'Pesquisa Vertical' },
                update: {},
            }),
            prisma.banners.upsert({
                where: { page: 'PUBLIC_PROFILE' },
                create: { page: 'PUBLIC_PROFILE', name: 'Perfil Gratuito' },
                update: {},
            }),
            prisma.banners.upsert({
                where: { page: 'NEWS' },
                create: { page: 'NEWS', name: 'Notícias' },
                update: {},
            }),
        ]);
    } catch (error) {
        console.error(error);
    }
}
