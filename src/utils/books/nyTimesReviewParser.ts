import got from 'got';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

export const nyTimesReviewParser = async (url: string): Promise<string> => {
  try {
    const response = await got(url);
    const dom = new JSDOM(response.body);
    const reviewText: string | null = dom.window.document.querySelector('#story > section')?.textContent ?? 'Text not found';
    return reviewText;
  } catch (err) {
    console.error(err);
    throw err; // Rethrow the error to handle it in the API function.
  }
}
