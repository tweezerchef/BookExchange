import sharp, { Sharp } from 'sharp';

// Utility function to sharpen an image
export async function sharpenImage(inputBuffer: Buffer, outputFormat: string = 'jpeg'): Promise<Buffer> {
    try {
        const image: Sharp = sharp(inputBuffer);
        image.sharpen(); // Apply sharpening filter
        return await image.toBuffer();
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        throw new Error(`Error sharpening image: ${error.message}`);
    }
}
