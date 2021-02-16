const axios = require('axios');
const config = require('../../config');

const searchBusiness = (term) => {

  const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=NewOrleans&limit=5&key=${config.YELP_API}`;

  return axios.get(url, { headers: {
    Authorization: `Bearer ${config.YELP_API}`
  }})
    .then(({data}) => data)
    .catch((err) => console.error(err));
};

module.exports = {
  searchBusiness
};