import { mount } from 'enzyme';
import Field from '../../components/common/Field';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Field
      name='fieldName'
      label='fieldLabel'
      placeholder='fieldPlaceholder'
      defaultValue='fieldValue'
    />
  );
});

it('show field on dom', () => {
  expect(wrapped.find('div.field').length).toEqual(1);
});

it('show label with text', () => {
  expect(wrapped.find('label').text()).toEqual('fieldLabel');
});

it('shows default value', () => {
  expect(wrapped.find('input[name="fieldName"]').instance().value).toEqual(
    'fieldValue'
  );
});

it('shows placeholder', () => {
  expect(
    wrapped.find('input[name="fieldName"]').instance().placeholder
  ).toEqual('fieldPlaceholder');
});
