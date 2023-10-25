import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { Books } from  '@prisma/client'

interface AutoCompleteData {
    id: string;
    title: string;
}

type SetAutoCompleteData = Dispatch<SetStateAction<AutoCompleteData[]>>;
type SetBooks = Dispatch<SetStateAction<Books[]>>;


export const getAutoComplete = async (setAutoCompleteData: SetAutoCompleteData) => {
    try {
        const response = await fetch(`api/bookDB/getSearchTitles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch book data");
        } else {
            const data = (await response.json()) as AutoCompleteData[];
            setAutoCompleteData(data);
        }
    } catch (err) {
        console.error(err);
    }
};
  export const handleAutoCompleteChange = (
    event: SyntheticEvent,
    value: AutoCompleteData | string | null,
    setBooks: SetBooks
  ) => {
    if (value) {
      const title = typeof value === "string" ? value : value.title;

      if (typeof value === "string") {
        fetch(`api/bookDB/queryGoogleBooks/${title}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setBooks((prevBooks) => {
              const updatedBooks: Books[] = [data, ...prevBooks] as Books[];
              updatedBooks.pop();
              return updatedBooks;
            });
          })
          .catch((error) => {
            console.error("Error fetching data from Google Books API:", error);
          });
      } else {
        fetch(`api/bookDB/getBook/${value.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data: Books) => {
            setBooks((prevBooks) => {
              const filteredBooks = prevBooks.filter(
                (book) => book.id !== data.id
              );
              const updatedBooks = [data, ...filteredBooks];
              updatedBooks.pop();
              return updatedBooks;
            });
          })
          .catch((error) => {
            console.error("Error fetching random books:", error);
          });
      }
    }
  };