const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');
let models = require('./db/models');

const typeDefs = `
    type Beer {
        id: ID!
        name: String!
        alcohol: Float!
        type: Int!
        brand: Int!
        description: String!
        volume: Float!
        price: Float!
    }

    input NewBeer {
        name: String!
        alcohol: Float!
        type: Int!
        brand: Int!
        description: String!
        volume: Float!
        price: Float!
    }

    input UpdateBeer {
        id: ID!
        name: String!
        alcohol: Float!
        type: Int!
        brand: Int!
        description: String!
        volume: Float!
        price: Float!
    }

    input DeleteBeer {
        id: ID!
    }

    type Query {
        cervezas: [Beer]
        cerveza(id: Int): Beer 
    }

    type Mutation {
        addBeer(beer: NewBeer): Beer
        updateBeer(beer: UpdateBeer): Beer
        deleteBeer(beer: DeleteBeer): Beer
    }
`

const resolvers = {
    Query: {
        cervezas: () => {
            return models.Beer.findAll(); 
        }, 

        cerveza: (_,args) => {
            return models.Beer.findOne({where:{id: args.id}});
        }
    },
    Mutation: {
        addBeer: (_,args) => {
            return models.Beer.create(args.beer);
        },
        updateBeer: (_,args) => {
            models.Beer.update(args.beer, {where:{id: args.beer.id}});
            return models.Beer.findOne({where:{id: args.beer.id}});
        },
        deleteBeer: (_, args) => {
            beer = models.Beer.findOne({where:{id: args.id}})
            models.Beer.destroy({where:{id: args.beer.id}});
        }
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

module.exports = schema;