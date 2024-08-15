import { PrismaClient } from '@prisma/client';
import { TUserMiddlwareResult } from '@/server/@types/user/TypeUserProfile';

export async function UserCreatePayaments(
    prisma: PrismaClient,
    user?: TUserMiddlwareResult | null
) {
    if (!user || !user.payaments) return user?.payaments;

    const payaments = await prisma.userPayaments.create({
        data: {
            User: {
                connect: {
                    email: user.email,
                },
            },
        },
    });

    return payaments;
}
