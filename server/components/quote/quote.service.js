const quoteDataAccess = require('./quote.data.js');
const Cache = require('../utils/cache/cache.js');

const cache = new Cache();

const loadAuthors = (callback) => {
  if (!cache.has('authors')) {
    quoteDataAccess.getAuthors(res => {
      cache.set('authors', res.authors);
      callback();
    });
  } else {
    callback();
  }
}

const getRandomAuthor = (answer, callback) => {
  loadAuthors(() => {
    const authors = cache.get('authors');
    let randomIdx = Math.floor(Math.random() * authors.length);
    while (authors[randomIdx] === answer) {
      randomIdx = Math.floor(Math.random() * authors.length);
    }
    callback(authors[randomIdx]);
  });
}

const getQuote = (callback) => {
  quoteDataAccess.generateRandomQuote(res => {
    if (res.statusCode === 200) {
      const answer = res.author;
      getRandomAuthor(answer, (otherAuthor) => {
        callback({
          statusCode: 200,
          quote: res.quote,
          author: res.author,
          otherAuthor: otherAuthor
        });
      });
    } else {
      callback(res);
    }
  });
}

module.exports = {
  getQuote: getQuote
}
