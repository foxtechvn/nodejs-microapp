import http from 'http';
import { env, mongo, port, ip, apiRoot, consul } from './config';
import mongoose from './services/mongoose';
import express from './services/express';
import api from './api';
// Consul Support
const consulInstance = require('consul')(consul);
const os = require('os');
const uuid = require('uuid');
const PID = process.pid;
const PORT = Math.floor(process.argv[2]);
const HOST = os.hostname();
const CONSUL_ID = `data-${HOST}-${PORT}-${uuid.v4()}`;
// End of consul requirements

const app = express(apiRoot, api);
const server = http.createServer(app);

// Begin consul endpoints
// Health check
app.get('/health', (req, res) => {
  console.log('GET /health', Date.now());
  res.send('ok');
});

// End consul endpoints

mongoose.connect(mongo.uri, { useMongoClient: true })
mongoose.Promise = Promise

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env);

    // Register to consul
    let details = {
      name: 'data',
      address: HOST,
      check: {
        ttl: '10s',
        deregister_critical_service_after: '1m'
      },
      port: port,
      id: CONSUL_ID
    };

    console.log('Consul Config Details', details);

    consulInstance.agent.service.register(details, err => {
      if (err) {
        throw new Error(err);
      }
      console.log('registered with Consul');

      setInterval(() => {
        consulInstance.agent.check.pass({id:`service:${CONSUL_ID}`}, err => {
          if (err) throw new Error(err);
          console.log('told Consul that we are healthy');
        });
      }, 5 * 1000);

      // Setup system to listen to SIGINT
      process.on('SIGINT', () => {
        console.log('SIGINT. De-Registering...');
        let details = {id: CONSUL_ID};
        consulInstance.agent.service.deregister(details, (err) => {
          console.log('de-registered.', err);
          process.exit();
        });
      });
    });
  })
})

export default app
