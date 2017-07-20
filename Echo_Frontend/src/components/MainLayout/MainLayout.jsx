import React from 'react';
import style from './MainLayout.less';
import Header from './Header';
import Suggestion from './Suggestion';

const MainLayout = ({ children, ...otherProps }) => {
  return (
    <div className={`${style.mainlayout}`}>
      <Header className={`${style.header}`} {...otherProps} />
      <div className={`${style.content}`}>
        {
          children || <Suggestion />
        }
      </div>
    </div>
  );
};

export default MainLayout;
