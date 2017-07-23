import React from 'react';
import { transContentToStr } from 'utils';

const PrueQuestion = ({ question, className }) => {
  return (
    <article className={className}>
      <h2>{question.title}</h2>
      <section>{transContentToStr(question.content)}</section>
    </article>
  );
};

export default PrueQuestion;
