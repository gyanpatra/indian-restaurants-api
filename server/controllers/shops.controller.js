import RestaurantsGeo from '../models/restaurants-geo.model';

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;

  RestaurantsGeo.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

function findWithinMiles(req, res, next) {
  const { withinRadiusInMiles = 10, latitude, longitude } = req.body;

  RestaurantsGeo.findWithinMiles({ withinRadiusInMiles, latitude, longitude })
    .then(users => res.json(users))
    .catch(e => next(e));
}


/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const restaurantsGeo = new RestaurantsGeo({
    name: 'gauri',
    geo: {
      type: 'Point',
      coordinates: [52.483, 16.084]
    }
  });

  restaurantsGeo.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}


export default { get, list, create, findWithinMiles };
