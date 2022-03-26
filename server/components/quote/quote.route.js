const quoteService = require('./quote.service.js');

const handleQuoteRoute = (req, res) => {
  if (req.url === '/quote/random') {
    if (req.method === 'GET') {
      quoteService.getQuote(result => {
        if (result.statusCode === 200) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        } else {
          res.statusCode = 500;
          res.end();
        }
      });
    } else {
      sendError(res);
    }
  } else {
    sendError(res);
  }
}

const sendError = (res) => {
  res.statusCode = 404;
  res.end();
}

module.exports = {
  handleQuoteRoute: handleQuoteRoute
}
