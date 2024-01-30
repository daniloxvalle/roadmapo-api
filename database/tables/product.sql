-- Table: public.product

-- DROP TABLE IF EXISTS public.product;

CREATE TABLE IF NOT EXISTS public.product
(
   id SERIAL NOT NULL,
   id_app_user INTEGER NOT NULL,
   name TEXT NOT NULL DEFAULT '',
   description TEXT NOT NULL DEFAULT '',
   vision TEXT NOT NULL DEFAULT '',
   CONSTRAINT pk_product PRIMARY KEY (id),
   CONSTRAINT fk_product_id_app_user___app_user_id FOREIGN KEY (id_app_user) REFERENCES app_user (id) ON DELETE CASCADE
)INHERITS (public._change_log)
WITH (OIDS=FALSE);

CREATE TRIGGER product_set_deleted_at_date
	BEFORE UPDATE OF deleted ON product
	FOR EACH ROW
	EXECUTE PROCEDURE set_deleted_at_date();

CREATE TRIGGER product_set_modified_at_date
	BEFORE UPDATE ON product
	FOR EACH ROW
	EXECUTE PROCEDURE set_modified_at_date();

-- Insert product
insert into product (id_app_user, name, description, vision) values (1, 'Mobile Application', 'Mobile version for Roadmapo software', '');
insert into product (id_app_user, name, description, vision) values (1, 'Web Application', 'Web version for Roadmapo software', '');
insert into product (id_app_user, name, description, vision) values (1, 'AR Glass', 'Augmented reality glass to see roadmapo reports', '');
insert into product (id_app_user, name, description, vision) values (1, 'Artificial Vision System', 'Artificial vision for automatic inspection and analysis of stock supply', '');