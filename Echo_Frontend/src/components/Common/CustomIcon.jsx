import React from 'react';

const CustomIcon = ({ type = '', className = '', onClick, style }) => {
  return (
    <i className={`iconfont icon-${type} ${className}`} style={style} onClick={onClick}/>
  );
};

export default CustomIcon;
