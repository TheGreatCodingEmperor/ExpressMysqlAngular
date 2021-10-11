const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const JWTGuard = require('express-jwt');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(JWTGuard({ secret: '123', algorithms: ['HS256']}).unless({path: ['/api/accounts/token','/api/accounts/signup']}));

app.use(function (err, req, res, next) {
  if (err && err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/tutorial.routes")(app);
require("./app/routes/account.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
