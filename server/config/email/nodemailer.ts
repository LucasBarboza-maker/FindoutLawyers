import nodemailer, { SendMailOptions } from 'nodemailer';
import * as EmailConfig from './config';

/*
:--------------------------------------------------------------------------
: Service
:--------------------------------------------------------------------------
*/

const transporter = nodemailer.createTransport({
    host: EmailConfig.AMAZON_SMTP,
    port: EmailConfig.AMAZON_SMTP_STARTTLS,
    secure: false,
    auth: {
        user: EmailConfig.AMAZON_SES_SMTP_USER,
        pass: EmailConfig.AMAZON_SES_SMTP_PASSWORD,
    },
    headers: {
        'X-SES-CONFIGURATION-SET': 'findoutlawyers',
    },
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
        console.log(EmailConfig);
    } else {
        console.log('Server is ready to take our messages', success);
    }
});

/*
:--------------------------------------------------------------------------
: Export
:--------------------------------------------------------------------------
*/

export { transporter as EmailTransporter };

export async function EmailTransporterSend(mailOptions: SendMailOptions) {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('error is ' + error);
                resolve({
                    status: false,
                    info,
                });
            } else {
                console.log('Email sent: ' + info.envelope);
                resolve({
                    status: true,
                    info,
                });
            }
        });
    });
}
