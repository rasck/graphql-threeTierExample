const express = require('express');
//https://www.npmjs.com/package/apollo-server
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
// handle post request from graphql
const bodyParser = require('body-parser');
// remote procedure libraray
const rpc = require('json-rpc2');

const client = rpc.Client.$create(4000, 'localhost');

const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'HelloRootQuery',
        fields: {
            // define a hello field
            hello: {
                // of type string
                type: GraphQLString,
                resolve() {
                    // Wrap connect socket and conn.cal into a promise
                    // because we have an async call back, and can't just return
                    // synchronously
                    return new Promise(function (resolve, reject) {
                        // We do not need http in our backend
                        // socket is faster (we will swap with rabbitmq later on)
                        client.connectSocket(function (err, conn) {
                            if (err) reject(err);
                            if (conn) {
                                // hello is the method we want to call
                                // empty array [] because we have no parameters
                                // and then a callback with the result = 'world!'
                                conn.call('hello', [], function (err, result) {
                                    if (err) reject(err);
                                    resolve(result);
                                });
                            }
                        });
                   });
                }
            }
        }
    })
})

const app = express();

// The production endpoint where the front (and maybe backends?)
// will query the graphql server
app.use('/graphql', bodyParser.json(), graphqlExpress({ 
    schema, // es6 syntax meaning: schema: schema
}));

// Browser based query explorer
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

const server = app.listen(8080, () => {
    console.log('listening on', server.address().port);
})