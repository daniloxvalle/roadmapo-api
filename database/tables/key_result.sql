-- Table: public.key_result

-- DROP TABLE IF EXISTS public.key_result;

CREATE TABLE IF NOT EXISTS public.key_result
(
   id SERIAL NOT NULL,
   id_app_user INTEGER NOT NULL,
   id_objective INTEGER NOT NULL,
   title TEXT NOT NULL DEFAULT '',
   description TEXT NOT NULL DEFAULT '',
   CONSTRAINT pk_key_result PRIMARY KEY (id),
   CONSTRAINT fk_key_result_id_app_user___app_user_id FOREIGN KEY (id_app_user) REFERENCES app_user (id) ON DELETE CASCADE,
   CONSTRAINT fk_key_result_id_objective___objective_id FOREIGN KEY (id_objective) REFERENCES objective (id) ON DELETE CASCADE
)INHERITS (public._change_log)
WITH (OIDS=FALSE);

CREATE TRIGGER key_result_set_deleted_at_date
	BEFORE UPDATE OF deleted ON key_result
	FOR EACH ROW
	EXECUTE PROCEDURE set_deleted_at_date();

CREATE TRIGGER key_result_set_modified_at_date
	BEFORE UPDATE ON key_result
	FOR EACH ROW
	EXECUTE PROCEDURE set_modified_at_date();

--Insert values
insert into key_result (id_app_user, id_product, id_objective, title, description) values (1, 1, 1,'Achieve an NPS of >24 from our customers', '');
insert into key_result (id_app_user, id_product, id_objective, title, description) values (1, 1, 1,'Increase customer Net Retention to >100%', '');
insert into key_result (id_app_user, id_product, id_objective, title, description) values (1, 1, 1,'Achieve product engagement measured by >80% WAU', '');
insert into key_result (id_app_user, id_product, id_objective, title, description) values (1, 1, 1,'Achieve a CSAT of 90%+ for all tier-1 tickets', '');
insert into key_result (id_app_user, id_product, id_objective, title, description) values (1, 1, 1,'Decrease first response from 1hr to <45mins', '');
insert into key_result (id_app_user, id_product, id_objective, title, description) values (1, 1, 1,'Resolve 95% of tier-2 support tickets in under 24 hours', '');
insert into key_result (id_app_user, id_product, id_objective, title, description) values (1, 1, 1,'100% of support reps maintain a personal CSAT of 95% or more', '');
insert into key_result (id_app_user, id_product, id_objective, title, description) values (1, 1, 1,'Implement a branded design guide by mid-quarter', '');
insert into key_result (id_app_user, id_product, id_objective, title, description) values (1, 1, 1,'Ensure 80% adherence to design guide by EOQ', '');
insert into key_result (id_app_user, id_product, id_objective, title, description) values (1, 1, 1,'Template out 5 presentation guides for re-use', '');