export const getISBN = (volumeInfo) => {
    const identifiers = volumeInfo;
    if (identifiers) {
      for (const identifierObj of identifiers) {
        if (identifierObj.type === 'ISBN_10') {
          return identifierObj.identifier;
        }
        if (identifierObj.type === 'ISBN_13') {
          return identifierObj.identifier;
        }
      }
    }
    return ''; // return an empty string when no ISBN-10 is found
  }

  export const getLargestImage = (imageLinks) => {
    const imageSizes = ['extraLarge', 'large', 'medium', 'small', 'thumbnail', 'smallThumbnail'];
  for (const size of imageSizes) {
    if (imageLinks[size]) {
      return imageLinks[size];
    }
  }
    return ''; // return an empty string when no image is found
    }