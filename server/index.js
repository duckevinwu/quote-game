const http = require('http');
const url = require('url');

const quote = require('./components/quote/quote.route.js');

const port = 8080;

const server = http.createServer((req, res) => {
  // set headers for cors
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Health Check OK');
  } else {
    const pathRoot = req.url.split('/')[1];
    if (pathRoot === 'quote') {
      quote.handleQuoteRoute(req, res);
    } else {
      res.statusCode = 404;
      res.end();
    }
  }
});

server.listen(port);
