const jsonServer = require('json-server');
const cors = require('cors'); // Add this line
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

server.use(middlewares);
server.use(cors()); // Now this will work
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});