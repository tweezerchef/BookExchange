

//this one works best

CREATE OR REPLACE FUNCTION log_user_books_activity()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD."starRating" IS DISTINCT FROM NEW."starRating" THEN
    INSERT INTO "Activity"("id", "userId", "type", "bookId", "userBookId", "description")
    VALUES (
      gen_random_uuid(),
      NEW."userId",
      'UserBooks Update',
      NEW."booksId",
      NEW."id",  -- Include the UserBook ID
      CONCAT(
        'Star Rating changed from ', COALESCE(OLD."starRating"::text, 'NULL'),
        ' to ', COALESCE(NEW."starRating"::text, 'NULL')
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_user_books_activity
AFTER UPDATE ON public."UserBooks"
FOR EACH ROW
EXECUTE FUNCTION log_user_books_activity()

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
        'Review changed from ', COALESCE(OLD."review", 'NULL'),
        ' to ', COALESCE(NEW."review", 'NULL')
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_log_user_books_activity_review AFTER UPDATE ON public."UserBooks" FOR EACH ROW EXECUTE FUNCTION log_user_books_activity_review()

UPDATE "UserBooks" SET "starRating" = 2 WHERE "id" = '01178bf8-470e-4ba6-beca-5f6e9637fca6';
