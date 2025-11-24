-- Add tee box support and yardages to holes

-- Add tee_boxes table
CREATE TABLE tee_boxes (
  id BIGSERIAL PRIMARY KEY,
  course_id BIGINT REFERENCES courses(id),
  tee_name VARCHAR(100) NOT NULL,
  tee_color VARCHAR(50),
  rating DECIMAL(4,1),
  slope INTEGER,
  total_yardage INTEGER
);

-- Add yardage columns to holes table for each tee
ALTER TABLE holes 
  ADD COLUMN championship_yardage INTEGER,
  ADD COLUMN tournament_yardage INTEGER,
  ADD COLUMN players_yardage INTEGER,
  ADD COLUMN gentlemen_yardage INTEGER,
  ADD COLUMN forward_yardage INTEGER;

-- Add selected_tee to scorecards
ALTER TABLE scorecards 
  ADD COLUMN selected_tee VARCHAR(50);

-- Insert tee boxes for Pecan Hollow
WITH c AS (
  SELECT id FROM courses WHERE course_name = 'Pecan Hollow Golf Course' LIMIT 1
)
INSERT INTO tee_boxes (course_id, tee_name, tee_color, rating, slope, total_yardage)
SELECT c.id, vals.tee_name, vals.tee_color, vals.rating, vals.slope, vals.total_yardage
FROM c, (VALUES
  ('Championship', 'Black', 75.4, 141, 7152),
  ('Tournament', 'Blue', 73.3, 136, 6672),
  ('Players', 'White', 70.5, 130, 6035),
  ('Gentlemen', 'Gold', 67.1, 112, 5365),
  ('Forward', 'Red', 68.9, 116, 4819)
) AS vals(tee_name, tee_color, rating, slope, total_yardage);

-- Update hole yardages for Pecan Hollow
WITH c AS (
  SELECT id FROM courses WHERE course_name = 'Pecan Hollow Golf Course' LIMIT 1
)
UPDATE holes h
SET 
  championship_yardage = vals.champ,
  tournament_yardage = vals.tourn,
  players_yardage = vals.play,
  gentlemen_yardage = vals.gent,
  forward_yardage = vals.fwd
FROM c, (VALUES
  (1, 426, 386, 368, 326, 268),
  (2, 434, 418, 365, 346, 328),
  (3, 581, 543, 518, 475, 451),
  (4, 417, 387, 357, 322, 263),
  (5, 223, 203, 182, 159, 138),
  (6, 498, 479, 444, 389, 326),
  (7, 401, 366, 330, 288, 265),
  (8, 185, 169, 155, 140, 101),
  (9, 569, 532, 490, 422, 380),
  (10, 370, 350, 308, 253, 218),
  (11, 193, 172, 172, 140, 121),
  (12, 400, 370, 300, 260, 229),
  (13, 355, 340, 321, 288, 260),
  (14, 221, 199, 181, 153, 134),
  (15, 395, 370, 346, 312, 288),
  (16, 483, 454, 435, 363, 352),
  (17, 554, 505, 466, 409, 391),
  (18, 447, 429, 382, 320, 306)
) AS vals(hole_num, champ, tourn, play, gent, fwd)
WHERE h.course_id = c.id AND h.hole_number = vals.hole_num;
