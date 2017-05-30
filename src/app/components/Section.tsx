import * as R from 'ramda';
import * as React from 'react';

import SectionComponent from './SectionComponent';

// import {registerSection, toggleSection} from '../actions/main';
// import {IStore, IStoreContext} from '../reducers';
// import {ISectionState} from '../reducers/reducers/main';

const expandedState = R.compose(R.objOf('expanded'), R.pathOr(true, ['state', 'expanded']));
const toggleEvent = R.compose(R.objOf('toggleEvent'), R.prop('toggleSection'));
const getExtraProps = R.converge(R.merge, [expandedState, toggleEvent]);
const getComponentProps = R.prop('props');
const getProps = R.converge(R.merge, [getComponentProps, getExtraProps]);

export interface ISectionProps {
  id: string;
  title: string;
}

export default class SectionContainer extends React.Component<ISectionProps, any> {
  constructor(props: ISectionProps) {
    super(props);
    if (!this.state) {
      this.state = {sections: []};
    }
  }

  componentDidMount() {
    this.initialiseSection();
  }

  initialiseSection() {
    // const {id} = this.props;
    // this.context.store.dispatch(registerSection(id));
  }

  toggleSection() {
    // const {id} = this.props;
    //noinspection TypeScriptValidateTypes
    // this.context.store.dispatch(toggleSection(id));
  }

  render() {
    const props = getProps(this);
    return (
      <SectionComponent {...props} />
    );
  }
}
