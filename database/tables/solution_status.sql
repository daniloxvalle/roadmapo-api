-- Table: public.solution_status

-- DROP TABLE IF EXISTS public.solution_status;

CREATE TABLE IF NOT EXISTS public.solution_status
(
   id INTEGER NOT NULL,
   name TEXT NOT NULL DEFAULT '',
   CONSTRAINT pk_solution_status PRIMARY KEY (id)
);

--Insert values
insert into solution_status (id, name) values (1, 'Idea');
insert into solution_status (id, name) values (2, 'To do');
insert into solution_status (id, name) values (3, 'In Progress');
insert into solution_status (id, name) values (4, 'Done');
