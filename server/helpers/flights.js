const axios = require('axios');

const getNolaFlights = () => {

  return axios.get('http://api.aviationstack.com/v1/flights?access_key=9fc225919793eaac770cb4bde93384e5&dep_iata=MSY').then(function (response) {
    res.json(response.data.data);
  }).catch(function (error) {
    res.json(error);
  });

};

module.exports = {
  getNolaFlights
};

