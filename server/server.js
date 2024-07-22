const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom route to authenticate user and return user data
server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = router.db; // Access the lowdb instance
  const user = db.get('users').find({ username, password }).value();

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Custom route to get a single user by id
server.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const db = router.db; // Access the lowdb instance
  const user = db.get('users').find({ id: userId }).value();

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

server.get('/users/:id/expenses', (req, res) => {
  const userId = req.params.id;
  const db = router.db; 
  
  const userExists = db.get('users').find({ id: userId }).value();

  if (!userExists) {
    return res.status(404).json({ error: "User not found" });
  }

  const expenses = db.get('expenses').filter({ userId }).value();

  if (expenses) {
    res.status(200).json(expenses);
  } else {
    res.status(404).json({ error: "Expenses not found for this user" });
  }
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
