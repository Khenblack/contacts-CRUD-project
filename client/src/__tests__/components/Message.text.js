import { mount } from 'enzyme';

import Message from '../../components/common/Message';

let wrapped;

beforeEach(() => {
  wrapped = mount(<Message body='bodyText' header='headerText' type='info' />);
});

afterEach(() => {
  wrapped.unmount();
});

it('show message component in DOM', () => {
  expect(wrapped.find('div.message').length).toEqual(1);
});

it('show type correctly', () => {
  expect(wrapped.find('div.message').hasClass('info')).toEqual(true);
});

it('show body text', () => {
  expect(wrapped.find('div.message > p').text()).toEqual('bodyText');
});
