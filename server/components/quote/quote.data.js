const axios = require('axios');

const generateRandomQuote = (callback) => {
  axios
    .get('https://quote-garden.herokuapp.com/api/v3/quotes/random')
    .then(res => {
      if (res.status === 200 && res.data.statusCode === 200) {
        callback({
          statusCode: 200,
          quote: res.data.data[0].quoteText,
          author: res.data.data[0].quoteAuthor
        });
      } else {
        callback({statusCode: 500});
      }
    })
    .catch(error => {
      callback({statusCode: 500});
    })
}

const getAuthors = (callback) => {
  axios
    .get('https://quote-garden.herokuapp.com/api/v3/authors')
    .then(res => {
      if (res.status === 200 && res.data.statusCode === 200) {
        callback({
          statusCode: 200,
          authors: res.data.data
        });
      } else {
        callback({statusCode: 500});
      }
    })
    .catch(error => {
      callback({statusCode: 500});
    })
}

module.exports = {
  generateRandomQuote: generateRandomQuote,
  getAuthors: getAuthors
}
