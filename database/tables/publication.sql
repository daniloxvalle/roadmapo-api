--Publication vai ter os tipos (status)
-- kanban (default)
-- table
-- timeline dots

-- Table: public.publication

-- DROP TABLE IF EXISTS public.publication;

CREATE TABLE IF NOT EXISTS public.publication
(
   id SERIAL NOT NULL,
   id_app_user INTEGER NOT NULL,
   id_product INTEGER NOT NULL,
   nanoid TEXT NOT NULL DEFAULT '',
   name TEXT NOT NULL DEFAULT '',
   disclaimer TEXT NOT NULL DEFAULT '',
   theme TEXT NOT NULL DEFAULT '',
   is_name_visible BOOLEAN NOT NULL DEFAULT TRUE,
   is_vision_visible BOOLEAN NOT NULL DEFAULT TRUE,
   is_solution_visible BOOLEAN NOT NULL DEFAULT TRUE,
   is_objective_visible BOOLEAN NOT NULL DEFAULT TRUE,
   is_disclaimer_visible BOOLEAN NOT NULL DEFAULT TRUE,
   CONSTRAINT pk_publication PRIMARY KEY (id),
   CONSTRAINT fk_publication_id_app_user___app_user_id FOREIGN KEY (id_app_user) REFERENCES app_user (id) ON DELETE CASCADE,
   CONSTRAINT fk_publication_id_product___product_id FOREIGN KEY (id_product) REFERENCES product (id) ON DELETE CASCADE
);

--Insert values
insert into publication (id_app_user, id_product, nanoid, name, disclaimer, theme, is_name_visible, is_vision_visible, is_solution_visible, is_objective_visible, is_disclaimer_visible) values (40, 15, '1_t9QkRU1xIW9Hj0cALlX', 'Mobile product internal roadmap', 'For campany internal use only', 'dark', TRUE, TRUE, TRUE, TRUE, TRUE);
insert into publication (id_app_user, id_product, nanoid, name, disclaimer, theme, is_name_visible, is_vision_visible, is_solution_visible, is_objective_visible, is_disclaimer_visible) values (40, 15, 'EAJppaXjHrFpcPzAdFrv7', 'Mobile product internal roadmap with stories', 'For campany internal use only', 'dark', TRUE, FALSE, TRUE, FALSE, TRUE);
insert into publication (id_app_user, id_product, nanoid, name, disclaimer, theme, is_name_visible, is_vision_visible, is_solution_visible, is_objective_visible, is_disclaimer_visible) values (40, 15, 'VrHnol1mp5oxZQlx-zqB1', 'Mobile product public roadmap', 'For costumers', 'light', TRUE, FALSE, FALSE, FALSE, FALSE);
