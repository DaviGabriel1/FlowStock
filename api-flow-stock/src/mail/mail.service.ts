import { MailData } from './interfaces/mail-data.interface';
import { AllConfigType } from '../config/config.type';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '../mailer/mailer.service';
import { Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { MaybeType } from 'src/utils/types/maybe.type';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<AllConfigType>
  ) {}

  async userSignUp(mailData: MailData<{ hash: string }>): Promise<void> {
    const i18n = I18nContext.current();
    let emailConfirmTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;

    if (i18n) {
      [emailConfirmTitle, text1, text2, text3] = await Promise.all([
        i18n.t('common.confirmEmail'),
        i18n.t('confirm-email.text1'),
        i18n.t('confirm-email.text2'),
        i18n.t('confirm-email.text3'),
      ]);
    }

    const frontendDomain = this.configService.getOrThrow('app.frontendDomain', {
      infer: true,
    });

    const url = new URL(frontendDomain);
    url.hash = `/confirm-email/?hash=${mailData.data.hash}`;

    const subDirectory = ['mail', 'mail-templates', 'activation.hbs'];
    const templateBasePath =
      process.env.NODE_ENV === 'production'
        ? this.configService.getOrThrow('app.workingDirectory', { infer: true })
        : path.join(
            this.configService.getOrThrow('app.workingDirectory', {
              infer: true,
            }),
            'src'
          );

    await this.mailerService.sendEmail({
      to: mailData.to,
      subject: emailConfirmTitle,
      text: `${url.toString()} ${emailConfirmTitle}`,
      templatePath: path.join(templateBasePath, ...subDirectory),
      context: {
        title: emailConfirmTitle,
        url: url.toString(),
        actionTitle: emailConfirmTitle,
        app_name: this.configService.get('app.name', { infer: true }),
        text1,
        text2,
        text3,
      },
    });
  }
}
