import _ from 'lodash';
import moment from 'moment';

export const rawDataFilter = ({ allTweets }) => {
  const date = [];
  const posData = [];
  const negData = [];
  _.forEach(allTweets, (it) => {
    const lg = moment(it.created_at, 'WWW MMM DD hh:mm:ss +0000 yyyy').format();
    date.push(lg);
    posData.push(it.positive_sentiment);
    negData.push(it.negative_sentiment);
  });
  return { date, posData, negData };
};
