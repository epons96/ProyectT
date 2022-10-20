const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();
const db = require("./db.json");
const fs = require("fs");

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/login", (req, res, next) => {
  const users = readUsers();

  const user = users.filter(
    (u) => u.username === req.body.username && u.password === req.body.password
  )[0];

  if (user) {
    res.send({ ...formatUser(user), token: checkIfAdmin(user) });
  } else {
    res.status(401).send("Incorrect username or password");
  }
});

server.post("/register", (req, res) => {
  const db = router.db;
  const users = readUsers();
  const collection = db.get("users");
  const user = users.filter((u) => u.username === req.body.username)[0];

  if (user === undefined || user === null) {
    collection.push(req.body).write();
    console.log(db.users);
    res.send({
      ...formatUser(req.body),
      token: checkIfAdmin(req.body),
    });
  } else {
    res.status(500).send("User already exists");
  }
});

// server.use("/users", (req, res, next) => {
//   if (isAuthorized(req) || req.query.bypassAuth === "true") {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// });

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

function formatUser(user) {
  delete user.password;
  // user.role = user.username === "admin" ? "admin" : "user";
  return user;
}

function checkIfAdmin(user, bypassToken = false) {
  return user.role === "admin" || bypassToken === true
    ? "admin-token"
    : "client-token";
}

// function isAuthorized(req) {
//   return req.headers.authorization === "admin-token" ? true : false;
// }

function readUsers() {
  const dbRaw = fs.readFileSync("./db.json");
  const users = JSON.parse(dbRaw).users;
  return users;
}
