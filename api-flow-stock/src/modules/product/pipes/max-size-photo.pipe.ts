import {
  ArgumentMetadata,
  Injectable,
  PayloadTooLargeException,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(
    value: Express.Multer.File | undefined,
    metadata: ArgumentMetadata
  ): Express.Multer.File {
    if (!value) {
      throw new PayloadTooLargeException('foto não enviada');
    }
    if (value.size > 5000000) {
      throw new PayloadTooLargeException(
        'o arquivo não pode ser maior que 5MB'
      );
    }
    return value;
  }
}
