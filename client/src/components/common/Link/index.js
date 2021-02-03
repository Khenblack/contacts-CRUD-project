// @flow
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
  type: 'primary' | 'danger',
  text: string,
  icon?: string,
  to: string
};
const Link = ({ text, icon, type, to }: Props) => {
  return (
    <div className='ui item'>
      <RouterLink to={to} className={`ui right floated button ${type}`}>
        {icon && <i className={`icon ${icon}`}></i>}
        {text}
      </RouterLink>
    </div>
  );
};

export default Link;
