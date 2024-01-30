-- Table: public.timeframe

-- DROP TABLE IF EXISTS public.timeframe;

CREATE TABLE IF NOT EXISTS public.timeframe
(
   id SERIAL NOT NULL,
   id_app_user INTEGER NOT NULL,
   id_product INTEGER NOT NULL,
   name TEXT NOT NULL DEFAULT '',
   summary TEXT NOT NULL DEFAULT '',
   is_archived BOOLEAN NOT NULL DEFAULT FALSE,
   CONSTRAINT pk_timeframe PRIMARY KEY (id),
   CONSTRAINT fk_timeframe_id_app_user___app_user_id FOREIGN KEY (id_app_user) REFERENCES app_user (id) ON DELETE CASCADE,
   CONSTRAINT fk_timeframe_id_product___product_id FOREIGN KEY (id_product) REFERENCES product (id) ON DELETE CASCADE
)INHERITS (public._change_log)
WITH (OIDS=FALSE);

CREATE TRIGGER timeframe_set_deleted_at_date
	BEFORE UPDATE OF deleted ON timeframe
	FOR EACH ROW
	EXECUTE PROCEDURE set_deleted_at_date();

CREATE TRIGGER timeframe_set_modified_at_date
	BEFORE UPDATE ON timeframe
	FOR EACH ROW
	EXECUTE PROCEDURE set_modified_at_date();

--Insert values
-- Default - Add to function
insert into timeframe (id_app_user, id_product, name, summary, is_archived) values (40, 15, 'Q1 `23', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE);
insert into timeframe (id_app_user, id_product, name, summary, is_archived) values (40, 15, 'Q2 `23', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum velit et lorem dapibus tincidunt.', FALSE);
insert into timeframe (id_app_user, id_product, name, summary, is_archived) values (40, 15, 'Q3 `23', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', FALSE);
insert into timeframe (id_app_user, id_product, name, summary, is_archived) values (40, 15, 'Q4 `23', 'Nullam elementum velit et lorem.', FALSE);
