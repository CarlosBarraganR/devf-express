#My Dev.f node.js with express app

1. Install express-generator with npm or yarn
2. Create app folder
```
express app 
```
3. Install our dependencies with npm or yarn 
```
yarn global add sequelize-cli
```
4. Create our sequelize config file named ".sequelizerc" and add our config

5. Run our sequelizer config file with:
```
sequelize init
```

6. Create your model with the command:
```
sequelize model:generate --name Beer --attributes name:string,alcohol:float,type:integer,brand:integer,description:string,volume:float,price:float
```

7. Add your new model routes in routes folder

```
router.get('/', (req, res, next) => {
    models.Beer.findAll().then((beers) => {
        res.send(beers);
    })
})
```

8. In app.js add the endpoint 
```
app.use('/api/v1/beers', beers);
```
#GraphQL

##GraphiQL Endpoints List

```
mutation{
  addChela(beer:{
    name: "Corona"
    alcohol: 2.3
    type: 1
    brand: 3
    description: "Good chela"
    volume: 2.2
    price: 19.40
  }){
    id
    name
    type
  }
}

mutation{
  deleteBeer(beer:{
    id: 14
  })
}

{
  cervezas{
    id
		name
		alcohol
		type
		brand
		description
		volume
		price
  }
}

{
  cerveza(id: 1){
    id
		name
		alcohol
		type
		brand
		description
		volume
		price
  }
}
```