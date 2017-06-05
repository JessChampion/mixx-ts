import * as R from 'ramda';
import {REGISTER_SECTION, TOGGLE_SECTION} from './actions';

export interface IMainState {
  sections: any;
}

const getSetter: any =  (sectionId: string) => R.assocPath(['sections', sectionId]);

const registerSection = (state: any, sectionId: string, expanded: boolean = true) => {
  return R.ifElse(R.has(sectionId), R.identity, R.assocPath(['sections', sectionId])(expanded))(state);
};
const toggleSection = (state: any, sectionId: string, expanded: boolean) => {
  const invertExp = R.compose(R.not, R.path(['sections', sectionId]));
  const setter = getSetter(sectionId);
  return R.ifElse(R.always(R.isNil(expanded)),
    R.converge(setter, [invertExp, R.identity]) as R.Arity1Fn,
    setter(expanded))(state);
};

export default function mainReducer(state: IMainState = {sections: {}}, action: any): IMainState {
  switch (action.type) {
    case REGISTER_SECTION:
      return registerSection(state, action.sectionId, action.expanded);
    case TOGGLE_SECTION:
      return toggleSection(state, action.sectionId, action.expanded);
    default:
      return state;
  }
}
