-- Table: public.initiative__objective

-- DROP TABLE IF EXISTS public.initiative__objective;

CREATE TABLE IF NOT EXISTS public.initiative__objective(
   id SERIAL NOT NULL,
   id_app_user INTEGER NOT NULL,
   id_product INTEGER NOT NULL,
	id_initiative INTEGER NOT NULL,
	id_objective INTEGER NOT NULL,
	CONSTRAINT pk_initiative__objective PRIMARY KEY (id_initiative, id_objective),
	CONSTRAINT fk_initiative__objective_id_initiative___initiative_id FOREIGN KEY (id_initiative) REFERENCES initiative (id) ON DELETE CASCADE,
	CONSTRAINT fk_initiative__objective_id_objective___objective_id FOREIGN KEY (id_objective) REFERENCES objective (id) ON DELETE CASCADE
);

-- Insert
INSERT INTO public.initiative__objective(id_app_user, id_product, id_initiative, id_objective)
VALUES(40, 15, 4, 5),(40, 15, 4, 2),(40, 15, 4, 3),(40, 15, 17, 4),(40, 15, 17, 2),(40, 15, 7, 2)
