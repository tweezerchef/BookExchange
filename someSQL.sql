CREATE OR REPLACE FUNCTION log_user_books_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD."starRating" IS DISTINCT FROM NEW."starRating" OR OLD."review" IS DISTINCT FROM NEW."review" THEN
    INSERT INTO "Activity"("id", "userId", "type", "bookId", "description")
    VALUES (
      gen_random_uuid(),  -- Generate a new UUID for the id
      NEW."userId",
      'UserBooks Update',
      NEW."booksId",
      'Star Rating changed from ' || OLD."starRating" || ' to ' || NEW."starRating" || ', Review changed from ' || OLD."review" || ' to ' || NEW."review"
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION log_user_books_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD."starRating" IS DISTINCT FROM NEW."starRating" OR OLD."review" IS DISTINCT FROM NEW."review" THEN
    INSERT INTO "Activity"("id", "userId", "type", "bookId", "userBookId", "description")
    VALUES (
      gen_random_uuid(),
      NEW."userId",
      'UserBooks Update',
      NEW."booksId",
      NEW."id",  -- Include the UserBook ID
      'Star Rating changed from ' || OLD."starRating" || ' to ' || NEW."starRating" || ', Review changed from ' || OLD."review" || ' to ' || NEW."review"
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

//this one works best

CREATE OR REPLACE FUNCTION log_user_books_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD."starRating" IS DISTINCT FROM NEW."starRating" OR OLD."review" IS DISTINCT FROM NEW."review" THEN
    INSERT INTO "Activity"("id", "userId", "type", "bookId", "userBookId", "description")
    VALUES (
      gen_random_uuid(),
      NEW."userId",
      'UserBooks Update',
      NEW."booksId",
      NEW."id",  -- Include the UserBook ID
      CONCAT(
        'Star Rating changed from ', COALESCE(OLD."starRating"::text, 'NULL'),
        ' to ', COALESCE(NEW."starRating"::text, 'NULL'),
        ', Review changed from ', COALESCE(OLD."review", 'NULL'),
        ' to ', COALESCE(NEW."review", 'NULL')
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

UPDATE "UserBooks" SET "starRating" = 2 WHERE "id" = '01178bf8-470e-4ba6-beca-5f6e9637fca6';
