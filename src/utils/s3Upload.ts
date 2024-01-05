import { S3 } from "aws-sdk";
import { Readable } from "stream";
import { getSignedURL } from './getSignedURL';


export async function uploadToS3(fileStream: Readable, fileName: string): Promise<string> {
  const s3 = new S3({
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: fileStream,
  };
  try {
    await new Promise((resolve, reject) => {
      s3.upload(params, (error: unknown, data: unknown) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
    const signedUrl = await getSignedURL(fileName);
    return signedUrl;  // Return the signed URL
  } catch (error) {
    console.error('Error uploading file or getting signed URL: ', error);
    throw new Error('Error uploading file or getting signed URL');
  }
}