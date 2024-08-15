import {
    BlogTopicActions,
    BlogTopicReplies,
    User,
    UserSettings,
    UserEvaluation,
    UserEvaluations,
    BlogTopic,
    UserPayaments,
} from '@prisma/client';

export type TUserMiddlwareResult = User & {
    settings?: UserSettings;
    evaluation?: UserEvaluation;
    UserEvaluations?: UserEvaluations[];
    blogs?: BlogTopic[];
    blogTopicReplies?: BlogTopicReplies[];
    blogTopicActions?: BlogTopicActions[];
    payaments?: UserPayaments;
};
