import React from 'react';

const CustomIcon = ({ type = '', className = '', onClick }) => {
  return (
    <i className={`iconfont icon-${type} ${className}`} onClick={onClick}/>
  );
};

export default CustomIcon;
