import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import App from '../../App';
import Menu from '../Menu';
import ContactEdit from '../../views/ContactEdit';
import ContactCreate from '../../views/ContactCreate';
import ContactList from '../../views/ContactList';
import ContactContext from '../../context/ContactContext';

const mockedContextValue = {
  contacts: [{ id: 1 }],
  getSingleContact: () => jest.fn()
};

it('shows a header', () => {
  const wrapped = shallow(<App />);
  expect(wrapped.find(Menu).length).toEqual(1);
});

it('shows contact list view', () => {
  const wrapped = mount(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(wrapped.find(ContactList).length).toEqual(1);
  expect(wrapped.find(Menu).length).toEqual(1);
});

it('shows contact edit view', () => {
  const wrapped = mount(
    <MemoryRouter initialEntries={['/add']}>
      <App />
    </MemoryRouter>
  );
  expect(wrapped.find(ContactCreate).length).toEqual(1);
  expect(wrapped.find(Menu).length).toEqual(1);
});

it('shows edit contact view', () => {
  const wrapped = mount(
    <MemoryRouter initialEntries={['/edit/1']}>
      <ContactContext.Provider value={mockedContextValue}>
        <App />
      </ContactContext.Provider>
    </MemoryRouter>
  );
  expect(wrapped.find(ContactEdit).length).toEqual(1);
  expect(wrapped.find(Menu).length).toEqual(1);
});
