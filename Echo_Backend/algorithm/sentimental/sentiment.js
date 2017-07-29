const Algorithmia = require('./utils');

const getSentiments = function (topic) {
  const API_KEY = 'sim/6NCFY/yxBX0KhPdYLikH3J31';

  const TWITTER = {
    APP_KEY: 'xMdXBAzs0rHI2v4G4B0G6xB1k',
    APP_SECRET: 'YpbkJtmRs599xuELx0D8PiMzd9rd6H3TuEBT1IHbLHGGKZYzTq',
    OAUTH_TOKEN: '472633231-kkFgTbS5lqibhgaGPgAqrUXrCiQLyI05acNkmQcT',
    OAUTH_TOKEN_SECRET: 'cKoMFJXvwjWyRQlPPYFTMV5J3vASbUnvPTRHIQb6cbzop',
  };

  const twitterInput = {
    query: topic,
    numTweets: '10',
    auth: {
      app_key: TWITTER.APP_KEY,
      app_secret: TWITTER.APP_SECRET,
      oauth_token: TWITTER.OAUTH_TOKEN,
      oauth_token_secret: TWITTER.OAUTH_TOKEN_SECRET,
    },
  };

  const client = Algorithmia.client(API_KEY);

  client.algo('nlp/AnalyzeTweets/0.1.9').pipe(twitterInput).then((output) => {
    return output;
  });
};

export default getSentiments;