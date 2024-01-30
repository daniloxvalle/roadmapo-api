/* ============================================================================================== */
/* TRIGGER FUNCTION: set_modified_at_date()                                               */
/* ============================================================================================== */
DROP FUNCTION IF EXISTS public.set_modified_at_date();

CREATE OR REPLACE FUNCTION public.set_modified_at_date()
  RETURNS TRIGGER AS
    $BODY$
    BEGIN
			NEW.modified_at = NOW() AT TIME ZONE 'BRT';
    RETURN NEW;
    END;
    $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ALTER FUNCTION public.set_modified_at_date() OWNER TO postgres;

/* ============================================================================================== */
/* TRIGGER FUNCTION: set_deleted_at_date()                                                */
/* ============================================================================================== */
DROP FUNCTION IF EXISTS public.set_deleted_at_date();

CREATE OR REPLACE FUNCTION public.set_deleted_at_date()
  RETURNS TRIGGER AS
    $BODY$
    BEGIN
        IF (NEW.deleted <> OLD.deleted AND NEW.deleted) THEN
          NEW.deleted_at = NOW() AT TIME ZONE 'BRT';
    END
    IF;
			RETURN NEW;
    END;
    $BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;

-- ALTER FUNCTION public.set_deleted_at_date() OWNER TO postgres;
