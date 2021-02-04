import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Link from '../../components/common/Link';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <MemoryRouter>
      <Link type='primary' icon='testIcon' text='linkText' to='/someRoute' />
    </MemoryRouter>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('show link in dom', () => {
  expect(wrapped.find('a').length).toEqual(1);
});

it('show an icon', () => {
  expect(wrapped.find('i.testIcon').length).toEqual(1);
});

it('show text', () => {
  expect(wrapped.find('a').html()).toContain('linkText');
});

it('show link with type', () => {
  expect(wrapped.find('a').hasClass('primary')).toEqual(true);
});

it('show href correctly', () => {
  expect(wrapped.find('a').prop('href')).toEqual('/someRoute');
});
