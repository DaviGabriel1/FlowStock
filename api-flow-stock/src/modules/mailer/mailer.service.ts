/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import * as fs from "node:fs/promises";
import Handlebars from "handlebars"
import { AllConfigType } from "src/config/config.type";

@Injectable()
export class MailerService{
    private readonly transporter:nodemailer.Transporter;
    constructor(private readonly configService: ConfigService<AllConfigType>) {
        this.transporter = nodemailer.createTransport({
        host: configService.get('mail.host', { infer: true }),
        port: configService.get('mail.port', { infer: true }),
        ignoreTLS: configService.get('mail.ignoreTLS', { infer: true }),
        secure: configService.get('mail.secure', { infer: true }),
        requireTLS: configService.get('mail.requireTLS', { infer: true }),
        auth: {
            user: configService.get('mail.user', { infer: true }),
            pass: configService.get('mail.password', { infer: true }),
        },
    });
    }

    async sendEmail({
        templatePath,
        context,
        ...mailOptions
    }: nodemailer.SendEmailOptions & {
            templatePath: string;
            context:Record<string,unknown>
        }): Promise<void> {
        let html: string | undefined;

        if (templatePath) {
            const template = await fs.readFile(templatePath, 'utf-8');
            html = Handlebars.compile(template,{
                strict:true
            })(context)
        }
        
        await this.transporter.sendMail({
          ...mailOptions,
          from: mailOptions.from
            ? mailOptions.from
            : `"${process.env.MAIL_DEFAULT_NAME}>`,
          html: mailOptions.html ? mailOptions.html : html,
        });
    }
}