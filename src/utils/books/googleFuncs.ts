type   IndustryIdentifiers = { type: string, identifier: string }[]

export const getISBN = (industryIdentifiers: IndustryIdentifiers) => {
  const identifiers = industryIdentifiers;
  if (identifiers) {
    const identifierObj = identifiers.find(
      (obj) => obj.type === 'ISBN_10' || obj.type === 'ISBN_13'
    );
    if (identifierObj) {
      return identifierObj.identifier;
    }
  }
  return '';
};

  export const getLargestImage = (imageLinks) => {
    const imageSizes = ['extraLarge', 'large', 'medium', 'small', 'thumbnail', 'smallThumbnail'];
    const foundSize = imageSizes.find(size => imageLinks[size]);
    return foundSize ? imageLinks[foundSize] : null;
  };

    export const fetchDescriptionFromOpenLibrary = async (isbn: string): Promise<string> => {
      try {
        const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`);
        if (!response.ok) {
          console.error('Failed to fetch description from Open Library:', response.statusText);
          return '';
        }
        const data = await response.json();
        const bookData = data[`ISBN:${isbn}`];
        return bookData.description ? bookData.description.value : '';
      } catch (error) {
        console.error('Error fetching description from Open Library:', error);
        return '';
      }
    };