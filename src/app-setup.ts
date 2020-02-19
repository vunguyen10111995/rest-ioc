const express = require('express');
const app = express();
const bodyParser = require('body-parser');

import PokemonController from './controller/RestController';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/rest", PokemonController);

export default app
