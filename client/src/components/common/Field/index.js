// @flow
import React from 'react';

type Props = {
  name: string,
  label: string,
  placeholder: string,
  defaultValue: string,
  error: { message: string } | null
};

const Field = React.forwardRef(
  ({ name, label, placeholder, defaultValue, error }: Props, ref) => {
    return (
      <div className={`field ${error ? 'error' : ''}`}>
        <label>{label}</label>
        <input
          name={name}
          type='text'
          placeholder={placeholder}
          defaultValue={defaultValue}
          ref={ref}
        />
        {error && <label className='ui red'>{error.message}</label>}
      </div>
    );
  }
);

export default Field;
