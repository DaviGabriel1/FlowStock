import { PutObjectCommand } from '@aws-sdk/client-s3';
import { S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AllConfigType } from "src/config/config.type";

@Injectable()
export class UploadService {
    private readonly s3Client: S3Client;
    constructor(private readonly configService: ConfigService<AllConfigType>) { 
        this.s3Client = new S3Client({
            region: this.configService.getOrThrow("s3.region", { infer: true }),
            credentials: {
                accessKeyId: this.configService.getOrThrow("s3.accessKeyId", { infer: true }),
                secretAccessKey: this.configService.getOrThrow("s3.secretAccessKey", { infer: true }),
            },
        });
    }

    async upload(fileName: string, file: Buffer): Promise<string> {
    const key = 'imagens/' + fileName.replaceAll(' ', '_');
        const resultUpload = await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.configService.getOrThrow("s3.bucketName", { infer: true }),
                Key: key,
                Body: file,
                ACL: 'public-read'
            })
        );

        return `https://${this.configService.getOrThrow('s3.bucketName', { infer: true })}.s3.${this.configService.getOrThrow('s3.region', { infer: true })}.amazonaws.com/${key}`;
    }
}