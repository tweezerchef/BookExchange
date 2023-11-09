

//this one works best

CREATE OR REPLACE FUNCTION log_user_books_activity_star()
RETURNS TRIGGER AS $$
DECLARE
  v_book_title TEXT;
  v_user_name TEXT;
BEGIN
SELECT title INTO v_book_title FROM Books WHERE id = NEW."booksId";
SELECT userName INTO v_user_name FROM Users WHERE id = NEW."userId";
  IF OLD."starRating" IS DISTINCT FROM NEW."starRating" THEN
    INSERT INTO "Activity"("id", "userId", "type", "bookId", "userBookId", "description")
    VALUES (
      gen_random_uuid(),
      NEW."userId",
      'StarRating',
      NEW."booksId",
      NEW."id",  -- Include the UserBook ID
      CONCAT(
        _v_user_name, ' rated ', v_title_name, (NEW."starRating"::text, 'NULL'), ' stars'
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER user_books_activity_trigger_star
AFTER UPDATE ON "UserBooks"
FOR EACH ROW
EXECUTE FUNCTION log_user_books_activity_star();

CREATE OR REPLACE FUNCTION log_user_books_activity_review()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD."review" IS DISTINCT FROM NEW."review" THEN
    INSERT INTO "Activity"("id", "userId", "type", "bookId", "userBookId", "description")
    VALUES (
      gen_random_uuid(),
      NEW."userId",
      'UserBooks Update',
      NEW."booksId",
      NEW."id",
      CONCAT(
        'Review', COALESCE(NEW."review", 'NULL')
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_books_activity_trigger_review
AFTER UPDATE ON "UserBooks"
FOR EACH ROW
EXECUTE FUNCTION log_user_books_activity_review();

CREATE OR REPLACE FUNCTION log_user_books_activity_review()
RETURNS TRIGGER AS $$
DECLARE
  v_book_title TEXT;
  v_user_name TEXT;
BEGIN
  -- Lookup the book title from the Books table
  SELECT title INTO v_book_title FROM Books WHERE id = NEW."booksId";
  -- Lookup the user name from the Users table
  SELECT userName INTO v_user_name FROM User WHERE id = NEW."userId";

  IF OLD."review" IS DISTINCT FROM NEW."review" THEN
    INSERT INTO "Activity"("id", "userId", "type", "bookId", "userBookId", "description")
    VALUES (
      gen_random_uuid(),
      NEW."userId",
      'Review',
      NEW."booksId",
      NEW."id",
      CONCAT(
        v_user_name, ' Reviewed ', v_book_title, COALESCE(NEW."review", 'NULL')
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;



UPDATE "UserBooks" SET "starRating" = 2 WHERE "id" = '01178bf8-470e-4ba6-beca-5f6e9637fca6';
