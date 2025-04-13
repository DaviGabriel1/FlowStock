export type S3Type = {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucketName: string;
    endpoint?: string;
    s3ForcePathStyle?: boolean;
    signatureVersion?: string;
    sslEnabled?: boolean;
    httpOptions?: {
        timeout?: number;
        agent?: any;
    };
}