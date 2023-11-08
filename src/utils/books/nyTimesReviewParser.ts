import got from 'got';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

const url: string = 'https://nytimes.com/2006/09/24/books/review/Itzkoff.t.html';
export const nyTimesReviewParser =() =>{
got(url).then((response) => {
  const dom = new JSDOM(response.body);
  // Replace 'some-selector' with the actual CSS selector for the review text on the page.
  const reviewText: string | null = dom.window.document.querySelector('#story > section')?.textContent ?? 'Text not found';
  return reviewText;
  // Here you would add your code to save the `reviewText` to your database.
}).catch((err: Error) => {
  console.error(err);
})
}
