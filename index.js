const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 9000;
const db = require('./db'); // Assuming db.js is in the same directory
require('dotenv').config();
const routes = require('./routes/index'); // Assuming routes/index.js is in the same directory

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World! From Backend');
  });

app.use("/", routes);

db.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
    app.listen(port, () => {
      console.log(`Server is running on the port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });