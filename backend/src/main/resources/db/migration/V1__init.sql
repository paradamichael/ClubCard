-- Flyway migration: create schema and seed Pecan Hollow (Murphy, TX)
-- Tables: users, clubs, courses, holes, scorecards, scorecard_scores

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS clubs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  club_name VARCHAR(255),
  club_type VARCHAR(100),
  carry_distance INTEGER
);

CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  course_name VARCHAR(255),
  location VARCHAR(255),
  holes_count INTEGER
);

CREATE TABLE IF NOT EXISTS holes (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  hole_number INTEGER,
  par INTEGER
);

CREATE TABLE IF NOT EXISTS scorecards (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  course_id INTEGER REFERENCES courses(id),
  played_on DATE
);

CREATE TABLE IF NOT EXISTS scorecard_scores (
  scorecard_id INTEGER REFERENCES scorecards(id),
  idx INTEGER,
  strokes INTEGER
);

-- Seed Pecan Hollow course (Murphy, TX) with 18 holes (sample pars)
INSERT INTO courses (course_name, location, holes_count)
VALUES ('Pecan Hollow Golf Course', 'Murphy, TX', 18)
ON CONFLICT DO NOTHING;

-- Ensure we have the course id
WITH c AS (
  SELECT id FROM courses WHERE course_name = 'Pecan Hollow Golf Course' LIMIT 1
)
INSERT INTO holes (course_id, hole_number, par)
SELECT c.id, vals.hole_number, vals.par
FROM c, (VALUES
  (1,4),(2,4),(3,3),(4,4),(5,5),(6,4),(7,3),(8,4),(9,5),
  (10,4),(11,4),(12,3),(13,4),(14,5),(15,4),(16,3),(17,4),(18,5)
) AS vals(hole_number,par)
ON CONFLICT DO NOTHING;
