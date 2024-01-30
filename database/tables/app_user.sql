-- Table: public.app_user

-- DROP TABLE IF EXISTS public.app_user;

CREATE TABLE IF NOT EXISTS public.app_user(
   id SERIAL NOT NULL,
   username VARCHAR NOT NULL,
   uid_firebase VARCHAR NOT NULL,
	CONSTRAINT pk_app_user PRIMARY KEY (id),
	CONSTRAINT ak_app_user_username UNIQUE (username),
	CONSTRAINT ak_app_user_uid_firebase UNIQUE (uid_firebase)
)INHERITS (public._change_log)
WITH (OIDS=FALSE);

CREATE TRIGGER app_user_set_deleted_at_date
	BEFORE UPDATE OF deleted ON app_user
	FOR EACH ROW
	EXECUTE PROCEDURE set_deleted_at_date();

CREATE TRIGGER app_user_set_modified_at_date
	BEFORE UPDATE ON app_user
	FOR EACH ROW
	EXECUTE PROCEDURE set_modified_at_date();

-- Insert
insert into app_user (username, uid_firebase) values ('daniloxvalle@gmail.com', 'DPmQZzUZP8doNzdwgYL8NNAsTj33');
insert into app_user (username, uid_firebase) values ('daniloxavier@gmail.com', 'w7EZMGbsrTSqxQNCoeewiJJxJ1p2');