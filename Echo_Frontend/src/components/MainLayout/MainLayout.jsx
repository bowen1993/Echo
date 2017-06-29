import React from 'react';
import style from './MainLayout.less';
import Header from './Header';

const MainLayout = ({ children, location }) => {
  return (
    <div className='mainlayout'>
      <Header className={`${style.header}`} location={location} />
      <div className={`${style.content}`}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
