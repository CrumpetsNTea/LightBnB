-- DELETE FROM users WHERE name='Timmy James';
-- DELETE FROM users WHERE name='Davy Crockett';
-- DELETE FROM users WHERE name='Bruce Wayne';
-- DELETE FROM properties WHERE title='Speed Lamp';
-- DELETE FROM properties WHERE title='Yellow Yurt';
-- DELETE FROM properties WHERE title='BatCave';
-- DELETE FROM reservations WHERE start_date='2021-09-11';
-- DELETE FROM reservations WHERE start_date='2021-07-06';
-- DELETE FROM reservations WHERE start_date='2021-05-05';
-- DELETE FROM property_reviews WHERE message='message';

-- ALTER SEQUENCE users_id_seq RESTART 1
-- ALTER SEQUENCE properties_id_seq RESTART 1
-- ALTER SEQUENCE reservations_id_seq RESTART 1
-- ALTER SEQUENCE property_reviews_id_seq RESTART 1

INSERT INTO users (name, email, password)
VALUES ('Timmy James', 'tj@gmail.com', 'password'),
('Davy Crockett', 'dc@gmail.com', 'password'),
('Bruce Wayne', 'notbatman@batman.com', 'password');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930, 6, 4, 8, 'Canada', '582 WestRidge Road', 'Montreal', 'Quebec', '4A0 7T9', true),
(3, 'Yellow Yurt', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 425, 2, 2, 4, 'Canada', '504 Unfortunate Lane', 'Regina', 'Saskatchewan', 'L5P 9T9', false),
(3, 'BatCave', 'description', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 1000, 6, 6, 8, 'United States', '1 Wayne Manor Road', 'Gotham City', 'Gotham', 'B4T 6V3', true);


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2021-09-11', '2021-09-26', 2, 2),
('2021-07-06', '2021-07-12', 3, 1),
('2021-05-05', '2021-05-10', 1, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 2, 2, 3, 'message'),
(1, 3, 2, 5, 'message'),
(2, 1, 3, 4, 'message');