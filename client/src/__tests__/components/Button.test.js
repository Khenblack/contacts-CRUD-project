import { mount } from 'enzyme';
import Button from '../../components/common/Button';

let wrapped;
const mockCallBack = jest.fn();

beforeEach(() => {
  wrapped = mount(
    <Button
      text='ButtonText'
      onClick={mockCallBack}
      icon='someIcon'
      type='primary'
    />
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('show button with text', () => {
  expect(wrapped.find('button').length).toEqual(1);
});

it('show button text', () => {
  expect(wrapped.find('button').text()).toEqual('ButtonText');
});

it('button fires click event', () => {
  wrapped.find('button').simulate('click');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});

it('button show an icon', () => {
  expect(wrapped.find('i').hasClass('someIcon')).toEqual(true);
});

it('button has type', () => {
  expect(wrapped.find('button').hasClass('primary')).toEqual(true);
});
