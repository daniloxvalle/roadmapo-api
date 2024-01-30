-- Table: public.initiative

-- DROP TABLE IF EXISTS public.initiative;

CREATE TABLE IF NOT EXISTS public.initiative
(
   id SERIAL NOT NULL,
   id_app_user INTEGER NOT NULL,
   id_product INTEGER NOT NULL,
   id_parent_initiative INTEGER CHECK (id_parent_initiative != id),
   id_timeframe INTEGER NOT NULL,
   generation SMALLINT NOT NULL DEFAULT 1 CHECK (generation < 4),
   CHECK ((id_parent_initiative IS NOT NULL) OR generation = 1),
   name TEXT NOT NULL DEFAULT '',
   description TEXT NOT NULL DEFAULT '',
   rank TEXT NOT NULL DEFAULT '0|0i0000:',
   CONSTRAINT pk_initiative PRIMARY KEY (id),
   CONSTRAINT fk_initiative_id_app_user___app_user_id FOREIGN KEY (id_app_user) REFERENCES app_user (id) ON DELETE CASCADE,
   CONSTRAINT fk_initiative_id_product___product_id FOREIGN KEY (id_product) REFERENCES product (id) ON DELETE CASCADE,
   CONSTRAINT fk_initiative_id_parent_initiative___initiative_id FOREIGN KEY (id_parent_initiative) REFERENCES initiative (id) ON DELETE CASCADE,
   CONSTRAINT fk_initiative_id_timeframe___timeframe_id FOREIGN KEY (id_timeframe) REFERENCES timeframe (id) ON DELETE CASCADE
)INHERITS (public._change_log)
WITH (OIDS=FALSE);

CREATE TRIGGER initiative_set_deleted_at_date
	BEFORE UPDATE OF deleted ON initiative
	FOR EACH ROW
	EXECUTE PROCEDURE set_deleted_at_date();

CREATE TRIGGER initiative_set_modified_at_date
	BEFORE UPDATE ON initiative
	FOR EACH ROW
	EXECUTE PROCEDURE set_modified_at_date();


--Insert values
insert into initiative (id_app_user, id_product, id_timeframe, id_parent_initiative, generation, name, description) values (40, 15, 1, NULL, 1, 'Increase engagement', 'Creating resources within the application preventing the user from having to access the web page will increase user engagement and may lead to a reduction in cancellations and an increase in conversion.');
insert into initiative (id_app_user, id_product, id_timeframe, id_parent_initiative, generation, name, description) values (40, 15, 1, NULL, 1, 'Improve software usability', 'This initiative aims to bring more resources to the application, facilitating the process of starting a game and making the optimization process faster. We understand that improving practicality and keeping the user engaged bring more value to the product.');
insert into initiative (id_app_user, id_product, id_timeframe, id_parent_initiative, generation, name, description) values (40, 15, 1, NULL, 1, 'Improve the application installation experience', 'We have a low activation of the product, this initiative aims to facilitate the initial use of the product. We understand that by improving the installation process we will have a greater number of new users optimizing a route, which will positively impact the free trial conversion.');
insert into initiative (id_app_user, id_product, id_timeframe, id_parent_initiative, generation, name, description) values (40, 15, 1, NULL, 1, 'Facilitate the renewal of a plan', 'We are looking for ways to clarify the status of the users plan, facilitate the act of renewing the plan and a new subscription, we believe that in this way we will be able to reduce churn rates and increase the conversion of free trials.');
insert into initiative (id_app_user, id_product, id_timeframe, id_parent_initiative, generation, name, description) values (40, 15, 1, NULL, 1, 'Improve communication with users', 'We received several contacts from customers asking them to inform what was changed in each software update. Better communication with these customers, showing the work being developed should create a greater connection with the public, generating greater user confidence and reducing the number of cancellations.');
insert into initiative (id_app_user, id_product, id_timeframe, id_parent_initiative, generation, name, description) values (40, 15, 1, NULL, 1, 'Collect data for product evolution', 'The collection of application usage data generates a key input for product development. We aim to understand how the user uses the software, which features are least and most used, understand the users journey and propose improvements based on data. We also have the need to test new ideas and hypotheses with real customers for a more effective evolution of the product.');
insert into initiative (id_app_user, id_product, id_timeframe, id_parent_initiative, generation, name, description) values (40, 15, 1, NULL, 1, 'Make design more intuitive', 'We identified in assisted tests that some users find it difficult to use the applications resources and we understand that the usability of the software can be more intuitive.');
insert into initiative (id_app_user, id_product, id_timeframe, id_parent_initiative, generation, name, description) values (40, 15, 1, NULL, 1, 'Make design more intuitive', 'We identified in assisted tests that some users find it difficult to use the applications resources and we understand that the usability of the software can be more intuitive.');
insert into initiative (id_app_user, id_product, id_timeframe, id_parent_initiative, generation, name, description) values (40, 15, 1, NULL, 1, 'Make design more intuitive', 'We identified in assisted tests that some users find it difficult to use the applications resources and we understand that the usability of the software can be more intuitive.');

-- ADD CONSTRAINT CHECK
-- alter table initiative 
-- add CONSTRAINT initiative_check1
-- CHECK (
-- 	(id_parent_initiative IS NOT NULL) OR generation = 1
-- )

-- ADD CONSTRAINT
-- alter table initiative 
-- add CONSTRAINT fk_initiative_id_timeframe___timeframe_id FOREIGN KEY (id_timeframe) REFERENCES timeframe (id) ON DELETE CASCADE