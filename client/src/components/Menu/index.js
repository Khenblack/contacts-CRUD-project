// @flow
import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div className='ui inverted menu'>
      <div className='ui container'>
        <Link to='/' className='header item'>
          <i className='leanpub icon'></i>Contacts
        </Link>
      </div>
    </div>
  );
};

export default Menu;
