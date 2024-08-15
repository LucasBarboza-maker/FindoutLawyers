import { PrismaClient } from '@prisma/client';

export async function BlogUpdateTotalLikes(
    prisma: PrismaClient,
    blogId: string
): Promise<boolean> {
    try {
        const totalLikes = await prisma.blogTopicActions.count({
            where: { BlogTopic: { id: blogId }, category: 'LIKE' },
        });

        await prisma.blogTopic.update({
            where: {
                id: blogId,
            },
            data: {
                totalLikes,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
}
