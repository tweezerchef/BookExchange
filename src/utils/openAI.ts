import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey
});
type CompletionResponse = string[]


const lowTitles = ["The Great Gatsby", "The Catcher in the Rye", "The Grapes of Wrath"];
const topTitles = ["Dune", "WallStreet", "Neuromancer"];



export async function getSuggestionsOpenAI(top: string, bottom: string) {
  const completion = await openai.chat.completions.create({
    messages: [{
      role: 'system',
      content: `Please respond with 10 unique book titles in quotes, each separated by commas, in the form of an array of strings, as recommendations for somebody that likes these books: ${top} and dislikes these: ${bottom} Try to create unique suggestions, find correlations based on what other people like the user like, including themes but not necessarily genres, and try to include a mix of 1/4 well-known books and 3/4 lesser-known books.`
    }],
    model: "gpt-3.5-turbo-1106",
  });
 const parsedCompletion = completion.choices[0].message.content

 return parsedCompletion;
}
