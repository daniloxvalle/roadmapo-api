-- Table: public.objective

-- DROP TABLE IF EXISTS public.objective;

CREATE TABLE IF NOT EXISTS public.objective
(
   id SERIAL NOT NULL,
   id_app_user INTEGER NOT NULL,
   id_product INTEGER NOT NULL,
   name TEXT NOT NULL DEFAULT '',
   color VARCHAR(7) NOT NULL DEFAULT '#0000ff',
   CONSTRAINT pk_objective PRIMARY KEY (id),
   CONSTRAINT fk_objective_id_app_user___app_user_id FOREIGN KEY (id_app_user) REFERENCES app_user (id) ON DELETE CASCADE,
   CONSTRAINT fk_objective_id_product___product_id FOREIGN KEY (id_product) REFERENCES product (id) ON DELETE CASCADE
);

ALTER TABLE public.objective
   ADD CONSTRAINT color_hex_constraint
   CHECK (color IS NULL or color ~* '^#[a-f0-9]{6}$');

--Insert values to check color constraint
insert into objective (id_app_user, id_product, name, color) values (40, 15, 'Delight our customers', '#0000ff');
insert into objective (id_app_user, id_product, name, color) values (40, 15, 'Deliver a world-class customer support experience', '#0000ff');
insert into objective (id_app_user, id_product, name, color) values (40, 15, 'Rebrand consistency is top notch', '#ff00ff');
insert into objective (id_app_user, id_product, name, color) values (40, 15, 'Reduce churn', '#ff00ff');
insert into objective (id_app_user, id_product, name, color) values (40, 15, 'Increase conversion rate', '#0000ff');
