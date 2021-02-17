const { Router } = require('express');
const Search = Router();
const { searchBusiness } = require('../helpers/search');

Search.get('/', (req, res) => {
  console.log('LINE SIX', req.query);
  const { term } = req.query;

  searchBusiness(term)
    .then((data) => res.status(200).json(data))
    .catch(() => res.warn(404));
});

module.exports = {
  Search
};