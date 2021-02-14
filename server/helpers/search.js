const axios = require('axios');
require('dotenv').config();
const searchBusiness = (term, location) => {

  const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&limit=5&key=1iVxm0JzrSlcEbM4lIyO82t4m9PPXpYKKSPgc-2Zg8ndvlqtOTp7yUk9zwn82C4EZucCSNC_r-xmgq5OB8rcel-YSXCJjxDCcSTWFoto-009EHZLq_ic9io_LugiYHYx`;

  return axios.get(url, { headers: {
    Authorization: `Bearer ${process.env.YELP_API}`
  }})
    .then(({data}) => data)
    .catch((err) => console.error(err));
};

module.exports = {
  searchBusiness
};