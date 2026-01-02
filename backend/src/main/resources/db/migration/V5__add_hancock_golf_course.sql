-- filepath: V5__add_hancock_golf_course.sql
-- Add Hancock Golf Club (Austin, Texas) with Blue and Red tees

-- Insert Hancock Golf Club course
INSERT INTO courses (course_name, location, holes_count)
VALUES ('Hancock Golf Club', 'Austin, Texas', 18)
ON CONFLICT DO NOTHING;

-- Insert holes for Hancock with yardages for Blue and Red tees
WITH c AS (
  SELECT id FROM courses WHERE course_name = 'Hancock Golf Club' LIMIT 1
)
INSERT INTO holes (course_id, hole_number, par, players_yardage, forward_yardage)
SELECT c.id, vals.hole_num, vals.par, vals.blue, vals.red
FROM c, (VALUES
  (1, 4, 324, 303),
  (2, 4, 335, 309),
  (3, 4, 346, 326),
  (4, 4, 264, 246),
  (5, 3, 152, 137),
  (6, 5, 462, 428),
  (7, 4, 357, 317),
  (8, 3, 144, 127),
  (9, 4, 249, 234),
  (10, 4, 324, 303),
  (11, 4, 335, 309),
  (12, 4, 346, 326),
  (13, 4, 264, 246),
  (14, 3, 152, 137),
  (15, 5, 462, 428),
  (16, 4, 357, 317),
  (17, 3, 144, 127),
  (18, 4, 249, 234)
) AS vals(hole_num, par, blue, red)
ON CONFLICT DO NOTHING;

-- Insert tee boxes for Hancock
WITH c AS (
  SELECT id FROM courses WHERE course_name = 'Hancock Golf Club' LIMIT 1
)
INSERT INTO tee_boxes (course_id, tee_name, tee_color, rating, slope, total_yardage)
SELECT c.id, vals.tee_name, vals.tee_color, vals.rating, vals.slope, vals.total_yardage
FROM c, (VALUES
  ('Blue', 'Blue', 72.0, 130, 5266),
  ('Red', 'Red', 70.0, 125, 4909)
) AS vals(tee_name, tee_color, rating, slope, total_yardage)
ON CONFLICT DO NOTHING;
