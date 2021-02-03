// @flow
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Menu from './components/Menu';
import ContactList from './views/ContactList';
import ContactForm from './views/ContactCreate';
import ContactEdit from './views/ContactEdit';

const App = () => {
  return (
    <div className='ui container'>
      <BrowserRouter>
        <Menu />
        <Switch>
          <Route path='/' exact component={ContactList} />
          <Route path='/add' component={ContactForm} />
          <Route path='/edit/:id' component={ContactEdit} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
