let express = require('express');
let router = express.Router();
let params = require('strong-params');
let bodyParser = require('body-parser');
let models = require('../db/models');

router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json());
router.use(params.expressMiddleware())

router.get('/', (req, res, next) => {
    models.Beer.findAll().then((beers) => {
        res.send({beers:beers});
    })
})

router.post('/', (req, res, next) => {
    let params = req.parameters;
    let beerParams = params.require('beer').permit('name', 'alcohol', 'type', 'brand', 'description', 'volume', 'price').value();
    
    models.Beer.create(beerParams).then((beer) => {
        res.status(201).send({beer:beer});
    }).catch((err) => {
        res.status(400).send({error:err.message});
    })
});

router.put('/:id', (req, res, next) => {
    let params = req.parameters;
    let beerParams = params.require('beer').permit('name').value();
    let beerId = req.params.id;
    let beerQuery = {
        where: {
            id: beerId
        }
    }

    models.Beer.findOne(beerQuery).then((beer) => {
        if (!beer){ res.status(404).send({error: "Not Found"})}

        beer.update(beerParams).then((updatedBeer) => {
            res.status(202).send({beer:updatedBeer})
        }).catch( (err) => {
            res.status(400).send({error:err.message});
        })

    })

})

router.delete('/:id', (req, res, next) => {
    let beerId = req.params.id;
    let beerQuery = {
        where: {
            id: beerId
        }
    }

    models.Beer.destroy(beerQuery).then((beer) => {
        if (!beer){ res.status(404).send({error: "Not Found"})}
    
        res.status(204).send({beer:beer});

    })

})

module.exports = router;