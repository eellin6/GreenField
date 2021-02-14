const { Router } = require('express');
const Search = Router();
const { searchBusiness } = require('../helpers/search');

Search.get('/', (req, res) => {
  searchBusiness()
    .then((data) => res.status(200).json(data))
    .catch(() => res.warn(404));
});

module.exports = {
  Search
};