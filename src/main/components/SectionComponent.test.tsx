import * as R from 'ramda';
import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {mount} from 'enzyme';

import SectionComponent from './SectionComponent';

const testProps = {
  children: (<div>Text Content</div>),
  id: 'aSection',
  title: 'Section Title',
};
const mockToggleHandler = jest.fn();

const mockStore = configureStore([]);
const createTestProps = R.useWith(R.merge, [R.identity, R.objOf('expanded')]);
const setup = (expandedState: boolean, store?: any) => {
  store = store ? store : mockStore();
  const props = createTestProps(testProps)(expandedState);
  return mount(
    <Provider store={store}>
      <SectionComponent {...props} toggleHandler={mockToggleHandler}/>
    </Provider>
  );
};

describe('Section component', () => {
  it('renders without crashing', () => {
    const underTest = setup(true).find('section');
    expect(underTest.length).toBeGreaterThan(0);
  });

  it('renders title', () => {
    const underTest = setup(true).find('section');
    const title = underTest.find('h2');
    expect(title.text()).toEqual(testProps.title);
  });

  it('renders children as content', () => {
    const section = setup(true).find('section');
    const sectionBody = section.children().last();
    expect(sectionBody.hasClass('section-body')).toBeTruthy();
    const content = sectionBody.children().last();
    expect(content.text()).toEqual('Text Content');
  });
});
