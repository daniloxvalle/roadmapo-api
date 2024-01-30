-- Table: public.solution

-- DROP TABLE IF EXISTS public.solution;

CREATE TABLE IF NOT EXISTS public.solution
(
   id SERIAL NOT NULL,
   id_app_user INTEGER NOT NULL,
   id_product INTEGER NOT NULL,
   id_initiative INTEGER NOT NULL,
   id_solution_status INTEGER NOT NULL DEFAULT 1,
   id_parent_solution INTEGER NULL CHECK (id_parent_solution != id),
   name TEXT NOT NULL DEFAULT '',
   description TEXT NOT NULL DEFAULT '',
   is_parent BOOLEAN NOT NULL DEFAULT FALSE,
   rank TEXT NOT NULL DEFAULT '0|0i0000:',
   CHECK ((is_parent = TRUE AND id_parent_solution IS NULL) OR is_parent = FALSE),
   CONSTRAINT pk_solution PRIMARY KEY (id),
   CONSTRAINT fk_solution_id_app_user___app_user_id FOREIGN KEY (id_app_user) REFERENCES app_user (id) ON DELETE CASCADE,
   CONSTRAINT fk_solution_id_product___product_id FOREIGN KEY (id_product) REFERENCES product (id) ON DELETE CASCADE,
   CONSTRAINT fk_solution_id_initiative___initiative_id FOREIGN KEY (id_initiative) REFERENCES initiative (id) ON DELETE CASCADE,
   CONSTRAINT fk_solution_id_solution_status___solution_status_id FOREIGN KEY (id_solution_status) REFERENCES solution_status (id),
   CONSTRAINT fk_solution_id_parent_solution___solution_id FOREIGN KEY (id_parent_solution) REFERENCES solution (id) ON DELETE CASCADE
)INHERITS (public._change_log)
WITH (OIDS=FALSE);

CREATE TRIGGER solution_set_deleted_at_date
	BEFORE UPDATE OF deleted ON solution
	FOR EACH ROW
	EXECUTE PROCEDURE set_deleted_at_date();

CREATE TRIGGER solution_set_modified_at_date
	BEFORE UPDATE ON solution
	FOR EACH ROW
	EXECUTE PROCEDURE set_modified_at_date();

--Insert values
insert into solution (id_app_user, id_product, id_initiative, id_solution_status, name, description) values (40, 15, 10, 1, 'Editor content review', 'As an Editor, I want to review content before it is published so that I can assure it is optimized with correct grammar and tone..');
insert into solution (id_app_user, id_product, id_initiative, id_solution_status, name, description) values (40, 15, 10, 1, 'Candidate Status', 'As a HR Manager, I need to view a candidate’s status so that I can manage their application process throughout the recruiting phases.');
insert into solution (id_app_user, id_product, id_initiative, id_solution_status, name, description) values (40, 15, 10, 1, 'Marketing analytics reports', 'As a Marketing Data Analyst, I need to run the analytics reports the so that I can build the monthly media campaign plans.');
insert into solution (id_app_user, id_product, id_initiative, id_solution_status, name, description) values (40, 15, 10, 1, 'Create product content', 'As a Content Owner, I want to be able to create product content so that I can provide information and market to customers.');
insert into solution (id_app_user, id_product, id_initiative, id_solution_status, name, description) values (40, 15, 10, 1, 'Gateway bid review', 'As an Acquisition Gateway User, I need to review my previous bids in the Acquisition ordering platform so that I can remove expired bids.');

-- ADD COLUMN
-- alter table solution 
-- add COLUMN rank TEXT NOT NULL DEFAULT '0|0i0000:'