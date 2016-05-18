import unirest from 'unirest';
import redis from 'redis';
import bluebird from 'bluebird';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient();

function uri(path) {
  return `http://pokeapi.co/api/v2/${path}`;
}

export function get(path, selectClause) {
  let fullUri = path;
  if (!fullUri.match(/http/)) {
    fullUri = uri(path);
  }

  return new Promise((resolve, reject) => {
    client.get(fullUri, (err, result) => {
      if (!result) {
        unirest
          .get(fullUri)
          .end(r => {
            if (r.statusCode == 404) return reject(new Error('invalid uri: ' + fullUri));

            return set(fullUri,
                       r.body,
                       reject,
                       data => resolve(selectClause(data)));
          });
      } else {
        resolve(selectClause(JSON.parse(result)));
      }
    });
  });
}

function set(key, data, failure, success) {
  return client.set(key, JSON.stringify(data), err => {
    if (err) failure(err);
    else success(data);
  });
}
