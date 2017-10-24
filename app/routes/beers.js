let express = require('express');
let router = express.Router();
let models = require('../db/models');

router.get('/', (req, res, next) => {
    models.Beer.findAll().then((beers) => {
        res.send(beers);
    })
})