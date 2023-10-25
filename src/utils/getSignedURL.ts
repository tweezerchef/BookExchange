import { S3 } from 'aws-sdk';

const s3 = new S3({
    region: 'us-east-2',  // update this to your region
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

export const getSignedURL = async (fileName: string) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60 * 5, // 5 minutes
  };

  try {
    const url = await s3.getSignedUrlPromise('getObject', params);
    return url;
  } catch (error) {
    console.error('Error getting signed URL: ', error);
    throw new Error('Error getting signed URL');
  }
}