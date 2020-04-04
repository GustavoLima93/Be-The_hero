const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
    exposedHeaders: ['X-Total-Count']
  })
);
app.use(routes);

app.listen(4200);
