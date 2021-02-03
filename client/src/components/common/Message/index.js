// @flow
import React from 'react';

type Props = {
  header?: string,
  body: string,
  type: 'info' | 'negative'
};

const Message = ({ header, body, type }: Props) => {
  return (
    <div className={`ui ${type} message`}>
      <div className='header'>{header}</div>
      <p>{body}</p>
    </div>
  );
};

export default Message;
