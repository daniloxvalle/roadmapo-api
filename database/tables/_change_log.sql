-- Table: public.changelog

DROP TABLE IF EXISTS public._change_log;

CREATE TABLE public._change_log(
	created_at TIMESTAMP NOT NULL DEFAULT TIMEZONE('BRT' ::TEXT, NOW()),
	modified_at TIMESTAMP,
   deleted BOOLEAN NOT NULL DEFAULT FALSE,
	deleted_at TIMESTAMP
)
WITH (OIDS=FALSE);

COMMENT ON TABLE public._change_log IS 'This TABLE is for inheritance use only. It is NOT intended to contain its own data.';

