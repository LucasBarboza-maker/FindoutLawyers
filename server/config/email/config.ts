import dotenv from 'dotenv';
import { ENV } from '../env';
dotenv.config();

/*
:--------------------------------------------------------------------------
: Config
:--------------------------------------------------------------------------
*/

export const AMAZON_SES_IAM: string = process.env.AMAZON_SES_IAM || '';
export const AMAZON_SES_SMTP_USER: string =
    process.env.AMAZON_SES_SMTP_USER || '';
export const AMAZON_SES_SMTP_PASSWORD: string =
    process.env.AMAZON_SES_SMTP_PASSWORD || '';
export const AMAZON_SMTP: string = 'email-smtp.sa-east-1.amazonaws.com';
export const AMAZON_SMTP_TLS: number = 465;
export const AMAZON_SMTP_STARTTLS: number = 587;
export const EMAIL_MAIN_ACCOUNT: string = ENV.EMAIL_MAIN_ACCOUNT || '';

export const AWS_ACCESS_KEY_ID: string = process.env.AWS_ACCESS_KEY_ID || '';
export const AWS_SECRET_ACCESS_KEY_ID: string =
    process.env.AWS_SECRET_ACCESS_KEY_ID || '';

export const EMAIL_USER: string = process.env.EMAIL_USER || '';
