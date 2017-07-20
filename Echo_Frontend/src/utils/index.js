import _ from 'lodash';

export const transContentToStr = (content) => {
  const lines = _.map(content.blocks, (it) => { console.log(it); return it.text; });
  return lines.join('');
};
