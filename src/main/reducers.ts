import * as R from 'ramda';
import {REGISTER_SECTION, TOGGLE_SECTION} from './actions';

export interface IMainState {
  sections: any;
}

const registerSection = (state: any, sectionId: string, expanded: boolean = true) => {
  return R.ifElse(R.has(sectionId), R.identity, R.assoc(sectionId, expanded))(state);
};

const toggleSection = (state: any, sectionId: string, expanded: boolean) => {
  return R.ifElse(R.always(R.isNil(expanded)),
    R.converge(R.assoc(sectionId), [R.compose(R.not, R.prop(sectionId)), R.identity]) as any,
    R.assoc(sectionId, expanded)
  )(state);
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
