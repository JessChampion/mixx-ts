import mainReducer from './reducers';
import {REGISTER_SECTION, TOGGLE_SECTION} from './actions';

const testId = 'testId';
const emptyState = {
  sections: {}
};
const existingState = {
  sections: {
    testId: true
  }
};

describe('Register section reducer', () => {
  it('adds a section to the state', () => {
    const action = {
      sectionId: testId,
      type: REGISTER_SECTION
    };
    const result = mainReducer(emptyState, action);
    expect(result.sections.testId).toBeDefined();
    expect(result.sections.testId).toBeTruthy();
  });

  it('adds a section to the state with specified expanded state', () => {
      const action = {
        expanded: false,
        sectionId: testId,
        type: REGISTER_SECTION
      };
      const result = mainReducer(emptyState, action);
      expect(result.sections.testId).toBeDefined();
      expect(result.sections.testId).toBeFalsy();
    }
  );

  it('adds another section to the state', () => {
    const otherTestId = 'otherTestId';
    const action = {
      expanded: false,
      sectionId: otherTestId,
      type: REGISTER_SECTION
    };
    const result = mainReducer(existingState, action);
    expect(result.sections.testId).toBeDefined();
    expect(result.sections.testId).toBeTruthy();
    expect(result.sections.otherTestId).toBeDefined();
    expect(result.sections.otherTestId).toBeFalsy();
  });
});

describe('Toggle section reducer', () => {
  it('toggles an existing sections expanded state', () => {
    const action = {
      sectionId: testId,
      type: TOGGLE_SECTION
    };
    const result = mainReducer(existingState, action);
    expect(result.sections.testId).toBeFalsy();
  });

  it('sets an existing sections expanded state with specified expanded state', () => {
    const action = {
      expanded: true,
      sectionId: testId,
      type: TOGGLE_SECTION
    };
    const result = mainReducer(existingState, action);
    expect(result.sections.testId).toBeTruthy();
  });
});
