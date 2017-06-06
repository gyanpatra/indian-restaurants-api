import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * RestaurantsGeo Schema
 */
const RestaurantsGeoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  geo: {
    type: { type: String, enum: ['Point', 'LineString', 'Polygon'], default: 'Point' },
    coordinates: Array
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
RestaurantsGeoSchema.method({
});

/**
 * Statics
 */
RestaurantsGeoSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
  findWithinMiles({ withinRadiusInMiles = 100, latitude, longitude } = {}) {
    const radiusInRadians = withinRadiusInMiles / 3963.2;
    const fieldsToBeReturned = { Name: 1, foodiesRecommendation: 1, geo: 1, _id: 0 };
    const query = {
      geo: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radiusInRadians]
        }
      }
    };
    return this.find(query, fieldsToBeReturned);
  }
};

/**
 * @typedef User
 */
export default mongoose.model('RestaurantsGeo', RestaurantsGeoSchema);
