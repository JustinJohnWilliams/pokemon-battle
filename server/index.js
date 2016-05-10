import unirest from 'unirest';

let req = unirest.get('http://pokeapi.co/api/v2/pokemon/');

req.end(res => console.log(res.body));
