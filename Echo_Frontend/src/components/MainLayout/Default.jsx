import React from 'react';
import Suggestion from './Suggestion';
import Demo from 'Sentiment/Demo';
import style from './Default.less';

const Default = () => {
  return (
    <div className={`${style.content}`}>
      <Suggestion className={`${style.suggestion}`}/>
      <Demo />
    </div>
  );
};

export default Default;
