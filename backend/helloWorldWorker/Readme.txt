Description:
The helloWorld worker is just a dump implementation to show how to call a backend service from resolve in graphql. It uses socket because it is supposed to be only reachable from the graphql server. In the furture it should be rabbitmq that handles the RPCs.

Uses:
RPC library (json-rpc2): For handling our socket connections with remote procedure calls
	json-rpc2 links:
		https://github.com/pocesar/node-jsonrpc2/blob/master/examples/server.js
		https://github.com/pocesar/node-jsonrpc2/blob/master/examples/client.js
		https://www.npmjs.com/package/json-rpc2

Run:
npm install
node app.js