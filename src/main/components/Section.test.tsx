import * as R from 'ramda';
import * as React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {mount} from 'enzyme';

import {REGISTER_SECTION, TOGGLE_SECTION} from '../actions';
import Section from './Section';

const testProps = {
  id: 'aSection',
  title: 'Section Title'
};
const testContent = (
  <div>Text Content</div>
);

const getIdMatcher = R.compose(R.propEq('sectionId') as any, R.prop('id'));
const findActionById = R.useWith(R.find, [getIdMatcher, R.identity]);
const getTypeMatcher = R.propEq('type');
const findActionByType = R.useWith(R.find, [getTypeMatcher, R.identity]);
const mockStore = configureStore([]);
const setup = (props: any, content: any, store?: any) => {
  store = store ? store : mockStore();
  return mount(
    <Provider store={store}>
      <Section {...props}>
        {content}
      </Section>
    </Provider>
  );
};

describe('Section', () => {

  it('renders without crashing', () => {
    const underTest = setup(testProps, testContent);
    const section = underTest.find('Section');
    expect(section.length).toBe(1);
  });

  it('renders section component', () => {
    const underTest = setup(testProps, testContent);
    const sectionComponent = underTest.find('SectionComponent');
    expect(sectionComponent.length).toBe(1);
  });

  it('sends registerSection on initialisation', () => {
    const store = mockStore();
    const section = setup(testProps, testContent, store).find('Section');
    expect(section.length).toBe(1);
    const actions = store.getActions();
    expect(actions.length).toBeGreaterThan(0);
    const action = findActionById(testProps)(actions);
    expect(action.type).toEqual(REGISTER_SECTION);
  });

  it('sends toggleSection on toggleEvent', () => {
    const store = mockStore();
    const section = setup(testProps, testContent, store).find('Section');
    expect(section.length).toBe(1);
    const toggleEvent: any = section.prop('onToggle');
    toggleEvent(testProps.id);
    const action = findActionByType(TOGGLE_SECTION, store.getActions());
    expect(action.sectionId).toBe(testProps.id);
  });
});