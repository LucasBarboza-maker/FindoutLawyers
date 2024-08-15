import { PrismaClient } from '@prisma/client';

export async function UpdateEvaluationsScore(
    email: string,
    prisma: PrismaClient
) {
    try {
        const [evaluations, total] = await prisma.$transaction([
            prisma.userEvaluations.findMany({
                where: {
                    UserEvaluation: {
                        User: {
                            some: {
                                email,
                            },
                        },
                    },
                    isChecked: true,
                },
                select: {
                    note: true,
                },
            }),
            prisma.userEvaluations.count({
                where: {
                    UserEvaluation: {
                        User: {
                            some: {
                                email,
                            },
                        },
                    },
                    isChecked: true,
                },
            }),
        ]);

        let notes: number = 0;

        evaluations.map((e) => {
            notes += e.note;
        });

        const average = parseFloat((notes / total).toFixed(2));

        await prisma.user.update({
            where: {
                email,
            },
            data: {
                evaluation: {
                    update: {
                        average,
                    },
                },
            },
        });
    } catch (error) {
        console.log({ email, error: 'UpdateEvaluationsScore' });
        console.error(error);
    }
}
