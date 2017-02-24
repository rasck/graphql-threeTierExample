Description:
The graphql server is a middletier that replaces the need for rest endpoints. It is setup so that one can try out different queries from a browser on localhost:8080/graphiql (remember the 'i'). In this hello world example one can query
{ hello }
and should expect the result:
{
  "data": {
    "hello": "world!"
  }
}

Uses:
Graphql Server Express (http://dev.apollodata.com/tools/graphql-server/index.html) -> As middletier between backend and frontend

Run:
npm install
node app.js