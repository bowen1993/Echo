import _ from 'lodash';
import moment from 'moment';

export const rawDataFilter = ({ allTweets }) => {
  console.log('enter', allTweets);
  const date = [];
  const posData = [];
  const negData = [];
  _.forEach(allTweets, (it) => {
    console.log('@', it);
    const lg = moment(it.created_at, 'WWW MMM DD hh:mm:ss +0000 yyyy').format();
    date.push(lg);
    posData.push(it.positive_sentiment);
    negData.push(it.negative_sentiment);
    console.log('222');
  });
  return { date, posData, negData };
};
