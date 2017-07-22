import React from 'react';
import style from './MainLayout.less';
import Header from './Header';
import Default from './Default';

const MainLayout = ({ children, ...otherProps }) => {
  return (
    <div className={`${style.mainlayout}`}>
      <Header className={`${style.header}`} {...otherProps} />
      <div className={`${style.content}`}>
        {
          children || <Default />
        }
      </div>
    </div>
  );
};

export default MainLayout;
