INSERT INTO authority
(id, code, name, description)
VALUES(1, 1, 'Read', 'Read a file'),
(2, 2, 'Edit', 'Write or modify a file'),
(3, 3, 'Delete', 'Delete a file'),
(4, 4, 'Create', 'Create a file');

INSERT INTO users
(id, email, first_name, last_name, password_hash, status, user_name)
VALUES(1234567801, 'dwayne@johnson.com', 'Dwayne', 'Johnson', 'dwayne123', 'active', 'The Rock'),
(1234567802, 'brad@pitt.com', 'Brad', 'Pitt', 'brad123', 'active', 'Brad'),
(1234567803, 'johnny@depp.com', 'Johnny', 'Depp', 'johnn123', 'active', 'Johnny'),
(1234567804, 'angelina@jolie', 'Angelina', 'Jolie', 'angelina123', 'active', 'Angelina'),
(1234567805, 'jim@carrey.com', 'Jim', 'Carrey', 'jim123', 'active', 'Jimmy'),
(1234567806, 'anthony@hopkins.com', 'Anthony', 'Hopkins', 'anthony123', 'inactive', 'Anthony'),
(1234567807, 'tom@cruise.com', 'Tom', 'Cruise', 'tom123', 'active', 'Tom'),
(1234567808, 'charlize@theron', 'Charlize', 'Theron', 'charlize123', 'inactive', 'Charlize'),
(1234567809, 'sophie@turner.com', 'Sophie', 'Turner', 'sophie123', 'active', 'Sophie'),
(1234567810, 'sandra@bullock.com', 'Sandra', 'Bullock', 'sandra123', 'active', 'Sandra'),
(1234567811, 'tom@holland.com', 'Tom', 'Holland', 'tom123', 'active', 'Tom'),
(1234567812, 'nicolas@cage.com', 'Nicolas', 'Cage', 'nicolas123', 'active', 'Nick'),
(1234567813, 'kelly@macdonald.com', 'Kelly', 'MacDonald', 'kelly123', 'inactive', 'Kelly'),
(1234567814, 'toni@collette.com', 'Toni', 'Collette', 'toni123', 'inactive', 'Toni'),
(1234567815, 'miles@teller.com', 'Miles', 'Teller', 'miles123', 'active', 'Miles');

