const url = require('url');

const protocol = 'http';
const port = process.env.APP_PORT || 3000;
const host = 'localhost:' + port;

const urlToSend = url.format({
  protocol: protocol,
  host: host,
});

module.exports = {
  port,
  urlToSend,
}