// @flow
import React from 'react';

type Props = {
  type?: 'positive' | 'primary' | 'red',
  text: string,
  icon?: string,
  onClick: () => void
};

const Button = ({ type, onClick, icon, text }: Props) => {
  return (
    <button
      className={`ui right button ${type ? type : ''}`}
      onClick={() => onClick()}
    >
      {icon && <i className={`icon ${icon}`}></i>}
      {text}
    </button>
  );
};

export default Button;
