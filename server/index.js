import { getPokemon } from './pokemon.js';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/pokemon', function (req, res) {
  getPokemon().then(r => res.json(r));
});

app.listen(process.env.PORT || 3000);
console.log('Listening on port: ' + (process.env.PORT || 3000));
