import { Readable } from 'stream';

export const convertBase64ToStream = (base64: string): Readable => {
  const buffer = Buffer.from(base64, 'base64');
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null); // Indicate the end of the stream
  return stream;
};