const rpc = require('json-rpc2');

const server = rpc.Server.$create();

function hello(args, opt, callback) {
    console.log('hello called!');
  let getResultFromDb = 'world!';
  callback(null, getResultFromDb);
}

server.expose('hello', hello);

// non-standard auth for RPC, when using this module using both client and server, works out-of-the-box
// server.enableAuth(function(user, password){
  
//   return user === 'user' && password === 'userSecret123';
// });

// We don't have a callback in listenRaw..
console.log(`will listen on port ${4000}`)
// Listen on raw tcp socket
server.listenRaw(4000, 'localhost');
