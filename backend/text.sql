DROP TABLE IF EXISTS kids_parents;
DROP TABLE IF EXISTS parents;
DROP TABLE IF EXISTS kids;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  id serial PRIMARY KEY,
  name TEXT NOT NULL,
  phone_nr INTEGER UNIQUE NOT NULL,
  adress TEXT NOT NULL
);

CREATE TABLE kids (
  id serial PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  age INTEGER NOT NULL,
  adress TEXT NOT NULL,
  department INTEGER NOT NULL,
  FOREIGN KEY(department) REFERENCES departments(id)
);

CREATE TABLE parents (
  id serial PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone_nr INTEGER UNIQUE NOT NULL,
  adress TEXT NOT NULL
);


CREATE TABLE kids_parents (
  kids_id INTEGER NOT NULL,
  parents_id INTEGER NOT NULL,
  -- PRIMARY KEY (kids_id, parents_id),
  FOREIGN KEY (kids_id) REFERENCES kids(id),
  FOREIGN KEY (parents_id) REFERENCES parents(id)
);

INSERT INTO departments (name, phone_nr, adress) VALUES
('Elefanten', 031472829, 'Bergsgatan 30'),
('Lejonet', 031785440, 'Bergsgatan 30'),
('Antilopen', 031879320, 'Bergsgatan 28'),
('Zebran', 031868739, 'Bergsgatan 28' );


INSERT INTO kids (first_name, last_name, age, adress, department) VALUES
('Ella', 'Andersson', 3, 'Solvägen 12', 1),
('Leo', 'Johansson', 5, 'Björkgatan 5', 1),
('Maja', 'Holm', 2, 'Lärkgatan 7', 1),
('Noah', 'Tran', 4, 'Ängsvägen 3', 1),
('Alma', 'Nguyen', 1, 'Blomstervägen 10', 1),
('William', 'Svensson', 2, 'Havrevägen 6', 2),
('Lilly', 'Eriksson', 3, 'Tallstigen 4', 2),
('Fatima', 'Al-Zahra', 5, 'Rönngatan 1', 2),
('Leon', 'Markovic', 4, 'Lärkgatan 7', 2),
('Axel', 'Holm', 4, 'Lärkgatan 7', 2),
('Saga', 'Persson', 3, 'Kastanjevägen 9', 3),
('Viktor', 'Olofsson', 1, 'Furugatan 15', 3),
('Laleh', 'Hussein', 5, 'Bäckvägen 14', 3),
('Lucas', 'Mattsson', 2, 'Ekgatan 6', 3),
('Freja', 'Ström', 4, 'Rosenvägen 13', 3),
('Isak', 'Olofsson', 4, 'Furugatan 15', 4),
('Stella', 'Simonsson', 2, 'Lönnvägen 3', 4),
('Emil', 'Magnusson', 5, 'Aspgatan 8', 4),
('Ines', 'Hussein', 3, 'Bäckvägen 14', 4),
('Thiago', 'Rodriguez', 1, 'Stjärnvägen 7', 4);

INSERT INTO parents (first_name, last_name, phone_nr, adress) VALUES
-- Ella Andersson
('Maria', 'Andersson', 1001001, 'Solvägen 12'),
('Jonas', 'Bergström', 1001002, 'Solvägen 12'),

-- Leo Johansson
('Erik', 'Johansson', 1001003, 'Björkgatan 5'),
('Anna', 'Lind', 1001004, 'Björkgatan 5'),

-- Maja & Axel Holm (syskon)
('Petra', 'Holm', 1001005, 'Lärkgatan 7'),
('Ali', 'Rahimi', 1001006, 'Lärkgatan 7'),

-- Noah Tran
('Thanh', 'Tran', 1001007, 'Ängsvägen 3'),
('Linh', 'Neho', 1001008, 'Ängsvägen 3'),

-- Alma Nguyen
('Huong', 'Nguyen', 1001009, 'Blomstervägen 10'),

-- William Svensson
('Karin', 'Svensson', 1001010, 'Havrevägen 6'),
('Mattias', 'Jönsson', 1001011, 'Havrevägen 6'),

-- Lilly Eriksson
('Emelie', 'Eriksson', 1001012, 'Tallstigen 4'),
('Tobias', 'Nilsson', 1001013, 'Tallstigen 4'),

-- Fatima Al-Zahra
('Layla', 'Al-Zahra', 1001014, 'Rönngatan 1'),

-- Leon Markovic
('Milan', 'Markovic', 1001015, 'Lärkgatan 7'),

-- Saga Persson
('Sofia', 'Persson', 1001016, 'Kastanjevägen 9'),
('Henrik', 'Mårtensson', 1001017, 'Kastanjevägen 9'),

-- Viktor & Isak Olofsson (syskon)
('Therese', 'Olofsson', 1001018, 'Furugatan 15'),
('Ali', 'Omar', 1001019, 'Furugatan 15'),

-- Laleh & Ines Hussein (syskon)
('Zahra', 'Hussein', 1001020, 'Bäckvägen 14'),
('Mohamed', 'Hussein', 1001021, 'Bäckvägen 14'),

-- Lucas Mattsson
('Sandra', 'Mattsson', 1001022, 'Ekgatan 6'),

-- Freja Ström
('Lina', 'Ström', 1001023, 'Rosenvägen 13'),
('Andreas', 'Westin', 1001024, 'Rosenvägen 13'),

-- Stella Simonsson
('Johan', 'Simonsson', 1001025, 'Lönnvägen 3'),

-- Emil Magnusson
('Camilla', 'Magnusson', 1001026, 'Aspgatan 8'),
('Oscar', 'Berg', 1001027, 'Aspgatan 8'),

-- Thiago Rodriguez
('Carlos', 'Rodriguez', 1001028, 'Stjärnvägen 7');

-- Ella Andersson (kid_id = 1) → parents 1, 2
INSERT INTO kids_parents VALUES (1, 1), (1, 2);

-- Leo Johansson (2) → 3, 4
INSERT INTO kids_parents VALUES (2, 3), (2, 4);

-- Maja Holm (3) → 5, 6
INSERT INTO kids_parents VALUES (3, 5), (3, 6);

-- Noah Tran (4) → 7, 8
INSERT INTO kids_parents VALUES (4, 7), (4, 8);

-- Alma Nguyen (5) → 9
INSERT INTO kids_parents VALUES (5, 9);

-- William Svensson (6) → 10, 11
INSERT INTO kids_parents VALUES (6, 10), (6, 11);

-- Lilly Eriksson (7) → 12, 13
INSERT INTO kids_parents VALUES (7, 12), (7, 13);

-- Fatima Al-Zahra (8) → 14
INSERT INTO kids_parents VALUES (8, 14);

-- Leon Markovic (9) → 15
INSERT INTO kids_parents VALUES (9, 15);

-- Axel Holm (10) → samma som Maja Holm → 5, 6
INSERT INTO kids_parents VALUES (10, 5), (10, 6);

-- Saga Persson (11) → 16, 17
INSERT INTO kids_parents VALUES (11, 16), (11, 17);

-- Viktor Olofsson (12) → 18, 19
INSERT INTO kids_parents VALUES (12, 18), (12, 19);

-- Laleh Hussein (13) → 20, 21
INSERT INTO kids_parents VALUES (13, 20), (13, 21);

-- Lucas Mattsson (14) → 22
INSERT INTO kids_parents VALUES (14, 22);

-- Freja Ström (15) → 23, 24
INSERT INTO kids_parents VALUES (15, 23), (15, 24);

-- Isak Olofsson (16) → samma som Viktor → 18, 19
INSERT INTO kids_parents VALUES (16, 18), (16, 19);

-- Stella Simonsson (17) → 25
INSERT INTO kids_parents VALUES (17, 25);

-- Emil Magnusson (18) → 26, 27
INSERT INTO kids_parents VALUES (18, 26), (18, 27);

-- Ines Hussein (19) → samma som Laleh → 20, 21
INSERT INTO kids_parents VALUES (19, 20), (19, 21);

-- Thiago Rodriguez (20) → 28
INSERT INTO kids_parents VALUES (20, 28);
