import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY_ID } from './config';
import { AWSError } from 'aws-sdk';
import SES, { Destination, Message } from 'aws-sdk/clients/ses';
import { PromiseResult } from 'aws-sdk/lib/request';
import { EMAIL_USER } from '@/server/config/email/config';

export type SourceEmailSendersType = 'ADMIN' | 'SUPPORT' | 'SYSTEM' | 'CONTATO';

export const SourceEmailSenders: Record<SourceEmailSendersType, string> = {
    ADMIN: 'Admin - Find Out Lawyers <admin@findoutlawyers.com>',
    SUPPORT: 'Suporte - Find Out Lawyers <support@findoutlawyers.com>',
    SYSTEM: 'Sistema - Find Out Lawyers <noreply@findoutlawyers.com>',
    CONTATO: 'Contato - Find Out Lawyers <contato@findoutlawyers.com>',
};

interface SendMessageServiceRunProps {
    source: SourceEmailSendersType;
    destination: Destination;
    message: Message;
}

export class SendMessageService {
    private client: SES;

    constructor() {
        this.client = new SES({
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY_ID,
            region: 'sa-east-1',
        });
    }

    static toAddress(name: string, email: string): string {
        return `${name} <${email}>`;
    }

    static systemEmail(source: SourceEmailSendersType): string {
        return SourceEmailSenders[source];
    }

    /**
     *
     * @example
     * const client = new SendMessageService()
     * await client.run({
     *   source: 'SUPPORT',
     *   destination: {
     *      ToAddresses: [
     *         "Michael <michaelwilliansantos@hotmail.com>",
     *         client.toAddress("Willian", "willian@hotmail.com")
     *      ]
     *   },
     *   message: {
     *      Subject: {  Data: "Assunto",  Charset?: "" },
     *      Body: { Html: { Data: "" }, Text: {Data: ""} }
     *   }
     * })
     */

    async run({
        source,
        destination,
        message,
    }: SendMessageServiceRunProps): Promise<
        PromiseResult<SES.SendEmailResponse, AWSError>
    > {
        return await this.client
            .sendEmail({
                Source: SourceEmailSenders[source],
                Destination: destination,
                Message: message,
                ConfigurationSetName: 'findoutlawyers',
            })
            .promise();
    }
}
