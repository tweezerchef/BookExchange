import { useState, useEffect } from "react";

const ExploreBooks: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    "right" | "left" | undefined
  >("left");
  const [books, setBooks] = useState<Book[]>([]);
  const [searchText, setSearchText] = useState("");
  const [showBigBook, setShowBigBook] = useState(false);
  const [bigBookPosition, setBigBookPosition] = useState({ top: 0, left: 0 });
  const [selectedBook, setSelectedBook] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/bookdata/id?id=${id}`);
      setBooks((prevBooks) => [...[res.data], ...prevBooks]);
      setCurrentPage(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchOnBlur = async () => {
    setLoading(true);
    try {
      if (searchText === "") {
        const res = await fetch(`/google-books/?title=${inputValue}`);
        setBooks((prevBooks) => [...res.data, ...prevBooks]);
        setCurrentPage(0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const getRandomBooks = () => {
    fetch("/api/bookDB/randomBooks")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching random books:", error);
      });
  };
  const booksPerPage = 4;

  const handleNextPage = () => {
    setSlideDirection("left");
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setSlideDirection("right");
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    getRandomBooks();
  }, []);
  return (
    <div>
      <h1>Explore</h1>
    </div>
  );
};

export default ExploreBooks;
