-- Fix column types: change SERIAL to BIGSERIAL and INTEGER foreign keys to BIGINT

DROP TABLE IF EXISTS scorecard_scores CASCADE;
DROP TABLE IF EXISTS scorecards CASCADE;
DROP TABLE IF EXISTS holes CASCADE;
DROP TABLE IF EXISTS clubs CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE clubs (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  club_name VARCHAR(255),
  club_type VARCHAR(100),
  carry_distance INTEGER
);

CREATE TABLE courses (
  id BIGSERIAL PRIMARY KEY,
  course_name VARCHAR(255),
  location VARCHAR(255),
  holes_count INTEGER
);

CREATE TABLE holes (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT REFERENCES courses(id),
  hole_number INTEGER,
  par INTEGER
);

CREATE TABLE scorecards (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  course_id BIGINT REFERENCES courses(id),
  played_on DATE
);

CREATE TABLE scorecard_scores (
  scorecard_id BIGINT REFERENCES scorecards(id),
  scores INTEGER
);

-- Seed Pecan Hollow course (Murphy, TX) with 18 holes
INSERT INTO courses (course_name, location, holes_count)
VALUES ('Pecan Hollow Golf Course', 'Murphy, TX', 18);

-- Insert holes for Pecan Hollow
WITH c AS (
  SELECT id FROM courses WHERE course_name = 'Pecan Hollow Golf Course' LIMIT 1
)
INSERT INTO holes (course_id, hole_number, par)
SELECT c.id, vals.hole_number, vals.par
FROM c, (VALUES
  (1,4),(2,4),(3,3),(4,4),(5,5),(6,4),(7,3),(8,4),(9,5),
  (10,4),(11,4),(12,3),(13,4),(14,5),(15,4),(16,3),(17,4),(18,5)
) AS vals(hole_number,par);
