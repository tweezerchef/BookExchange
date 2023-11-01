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
