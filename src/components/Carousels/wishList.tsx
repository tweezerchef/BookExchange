import exp from "constants";

type WishListProps = {
  books: Book[];
};

const WishList: React.FC<WishListProps> = ({ books }) => {
  return (
    <div>
      <h1>WishList</h1>
    </div>
  );
};

export default WishList;
