import app from '../bin/bin';
import mongoose from 'mongoose';
import config from '../config';
import consola from 'consola';
import https from 'https';
import http from 'http';
import fs from 'fs';
let server;
let key = '/etc/letsencrypt/live/nodeserver.mydevfactory.com/privkey.pem';
let cert = '/etc/letsencrypt/live/nodeserver.mydevfactory.com/fullchain.pem';

if(config.env === config.ENV_PROD){
  var options = {
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert)
  };
  mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    consola.success('Connected to MongoDB');
    https.createServer(options, app).listen(config.port,() => {
      consola.success(`Listening to port ${config.port}`);
    });
  });
}else{
  mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    consola.success('Connected to MongoDB');
    http.createServer(options, app).listen(config.port,() => {
      consola.success(`Listening to port ${config.port}`);
    });
  });
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      consola.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  consola.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  consola.info('SIGTERM received');
  if (server) {
    server.close();
  }
});