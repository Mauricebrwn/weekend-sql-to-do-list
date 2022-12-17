CREATE TABLE "chores" (
  "id" SERIAL PRIMARY KEY,
  "chore" VARCHAR(500) NOT NULL,
  "whos_it_for" VARCHAR(500),
  "done"VARCHAR(500),
  "notes" VARCHAR(1500)
);

INSERT INTO "chores"
  ("chore", "whos_it_for", "done","notes")
  VALUES
('Sweep','Bella','N','Kitchen for sure'),
('Load dishwasher','Tristan','N','Hand wash glass'),
('Fold clothes','Elli','N','Pants in second drawer');