import { PrismaClient } from '@prisma/client';

export async function BlogUpdateTotalReplies(
    prisma: PrismaClient,
    blogId: string
): Promise<boolean> {
    try {
        const totalReplies = await prisma.blogTopicReplies.count({
            where: { BlogTopic: { id: blogId } },
        });

        await prisma.blogTopic.update({
            where: {
                id: blogId,
            },
            data: {
                totalReplies,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
}
