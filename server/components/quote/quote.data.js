const axios = require('axios');

const generateRandomQuote = (callback) => {
  axios
    .get('https://api.quotable.io/random')
    .then(res => {
      if (res.status === 200) {
        callback({
          statusCode: 200,
          quote: res.data.content,
          author: res.data.author
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
    .get('https://quotable.io/authors?limit=150')
    .then(res => {
      if (res.status === 200) {
        const authorInfo = res.data.results;
        const authorList = authorInfo.map((authorObj) => {
          return authorObj.name;
        });
        callback({
          statusCode: 200,
          authors: authorList
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
