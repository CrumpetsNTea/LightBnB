/* eslint-disable camelcase */
const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 */
const getUserWithEmail = (email) => {
  const queryString = `SELECT * FROM users WHERE email = $1;`;
  const queryParams = [email];
  return pool
    .query(queryString, queryParams)
    .then((result) => {
      console.log(result.rows);
      if (!result) {
        return null;
      } else {
        return result.rows[0];
      }
    })
    .catch((err) => console.error(err.message));
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 */
const getUserWithId = (id) => {
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  const queryParams = [id];
  return pool
    .query(queryString, queryParams)
    .then((result) => {
      console.log(result.rows);
      if (!result) {
        return null;
      } else {
        return result.rows[0];
      }
    })
    .catch((err) => console.error(err.message));
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 */
const addUser = (user) => {
  const queryString = `INSERT INTO users (name, email, password) 
                        VALUES ($1, $2, $3)
                        RETURNING *`;
  const queryParams = [user.name, user.email, user.password];
  return pool
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 */
const getAllReservations = (guest_id, limit = 10) => {
  const queryString = `SELECT * FROM reservations
  JOIN properties ON properties.id = property_id
  WHERE guest_id = $1
  LIMIT $2`;
  const queryParams = [guest_id, limit];
  return pool
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties
/**
 * Get all properties with varying search parameters functionality
 */
const getAllProperties = (options, limit = 5) => {
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `AND cost_per_night BETWEEN $${queryParams.length - 1} AND $${queryParams.length}`;
  } else if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `AND cost_per_night >= $${queryParams.length}`;
  }  else if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `AND cost_per_night <= $${queryParams.length}`;
  }

  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `AND rating >= $${queryParams.length}`;
  }
  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  return pool
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 */
const addProperty = function(property) {
  const queryParams = [ property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms ];
  const queryString = `
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
RETURNING *
`;
  console.log(queryString, queryParams);
  return pool
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addProperty = addProperty;
