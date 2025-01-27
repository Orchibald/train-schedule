import { Injectable, OnModuleInit } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService implements OnModuleInit {
  onModuleInit() {
    const apiKey = process.env.SENDGRID_API_KEY;

    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY is not defined in the environment variables');
    }

    sgMail.setApiKey(apiKey);
  }

  async sendEmail(to: string, subject: string, text: string) {
    const msg = {
      to,
      from: process.env.FROM_EMAIL || 'orakz2003@gmail.com',
      subject,
      text,
    };

    try {
      const result = await sgMail.send(msg);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to send email: ${error.message}`);
      }
      throw new Error('An unknown error occurred while sending email');
    }
  }

  async sendVerificationCode(email: string, code: number) {
    const subject = 'Your Verification Code';
    const text = `Your verification code is: ${code}\n\nPlease enter this code in the application to verify your account.`;

    return this.sendEmail(email, subject, text);
  }
}
