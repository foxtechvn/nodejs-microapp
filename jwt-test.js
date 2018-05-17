var jwt = require('jsonwebtoken');
var request = require('request');
secret = 'b3e992f0f418d074dd453db9026bacf6a6c0566b';
var token = jwt.sign({ sub: 'administrator',
  auth: 'ROLE_ADMIN,ROLE_USER',
  exp: (new Date() / 1000) + 3600 }, new Buffer(secret, 'base64'), { algorithm: 'HS512'});

console.log('JWT token', token);

request.get({
  url: 'http://localhost:9000/api/do-charges', // 'http://ecas.ng:8083/api/sub-products',
  auth: {
    bearer: token
  },
  json: true
}, (error, response, body) => {

  console.log('Got body', response.statusCode, response.headers, body);
});
