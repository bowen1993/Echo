import _ from 'lodash';

export const transContentToStr = (content) => {
  const contentJson = (typeof content === 'string') ? JSON.parse(content) : content;
  const lines = _.map(contentJson.blocks, it => it.text);
  return lines.join('\n');
};
