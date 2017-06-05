import {REGISTER_SECTION, registerSection} from './actions';
import {TOGGLE_SECTION, toggleSection} from './actions';

it('registerSection should generate the correct action', () => {
  const id = 'testSection';
  const expanded = true;
  const expectedAction = {
    expanded,
    sectionId: id,
    type: REGISTER_SECTION
  };
  expect(registerSection(id, expanded)).toEqual(expectedAction);
});

it('toggleSection should generate the correct action', () => {
  const id = 'testSection';
  const expanded = true;
  const expectedAction = {
    expanded,
    sectionId: id,
    type: TOGGLE_SECTION
  };
  expect(toggleSection(id, expanded)).toEqual(expectedAction);
});
