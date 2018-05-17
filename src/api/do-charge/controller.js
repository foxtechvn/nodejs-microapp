import { success, notFound } from '../../services/response/'
import { DoCharge } from '.'
// Extra libraries
const request = require('request');

export const create = ({ bodymen: { body } }, res, next) =>
  DoCharge.create(body)
    .then((doCharge) => doCharge.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  DoCharge.count(query)
    .then(count => DoCharge.find(query, select, cursor)
      .then((doCharges) => ({
        count,
        rows: doCharges.map((doCharge) => doCharge.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  DoCharge.findById(params.id)
    .then(notFound(res))
    .then((doCharge) => doCharge ? doCharge.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  DoCharge.findById(params.id)
    .then(notFound(res))
    .then((doCharge) => doCharge ? Object.assign(doCharge, body).save() : null)
    .then((doCharge) => doCharge ? doCharge.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  DoCharge.findById(params.id)
    .then(notFound(res))
    .then((doCharge) => doCharge ? doCharge.remove() : null)
    .then(success(res, 204))
    .catch(next)


// Extra behavior
export const sendChargeRequest = ({ query }, res, next) => {
  console.log('Got Params', query );
  const secret = '2BF31D103C74525A7E6FE9D9DC333BD20C3E093C646AAD84932BB03B3F35B4D6'; // Hashed password. Provided by Etisalat andhashed by SP with SHA256
  let headers = {
    'username': 'COSMOS', // Username provided by Etisalat
    'Authorization': secret,
    'Ocp-Apim-Subscription-Key': 'deb3c7c967484adc94ad8852dcd80b22'// Azure API Subscription key (to be provided by Etisalat
  };
  console.log('Send charge request with header of ', headers, 'Params', query);
  request({
    url: 'https://directbillstage.9mobile.com.ng/stg/asyncbilling', // https://directbill.etisalat.com.ng/async
    method: 'POST',
    json: true,
    body: query,
    headers: headers
  }, (err, response, body) => {
    if (err) throw err;
    console.log('Body', response.statusCode, response.headers, body);
    res.status(response.statusCode).json(body).end();
  });
}
