
export const getGoogleByISBN = async (ISBN: string) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

if (require.main === module) {
    const ISBN = process.argv[2];

    if (!ISBN) {
      console.error("Please provide an ISBN as an argument.");
      process.exit(1);
    }

    getGoogleByISBN(ISBN).then(data => {
      console.log(data);
    }).catch(error => {
      console.error("Error fetching data:", error);
    });
    }