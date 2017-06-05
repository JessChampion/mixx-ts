import * as R from 'ramda';
import * as React from 'react';
import {connect} from 'react-redux';

import {registerSection, toggleSection} from '../actions';
import SectionComponent from './SectionComponent';

interface ISectionProps {
  id: string;
  title: string;
  children?: any;
}

interface IStateProps {
  expanded: boolean;
}

interface IDispatchProps {
  onConstruction: any;
  onToggle: any;
}

const getBaseProps = R.pick(['id', 'title', 'children', 'expanded']);
const doToggle = (method: any, id: string) => () => method(id);
const getToggleHandler = R.applySpec({toggleHandler: R.converge(doToggle, [R.prop('onToggle'), R.prop('id')])});
const getProps = R.converge(R.merge, [getBaseProps, getToggleHandler]);

const mapStateToProps = (state: any, ownProps: any) => {
  const id: string = ownProps.id;
  const exp: boolean = R.pathOr(true, ['main', 'sections', id])(state);
  return {expanded: exp};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onConstruction: (id: string) => {
      dispatch(registerSection(id));
    },
    onToggle: (id: string) => {
      dispatch(toggleSection(id));
    }
  };
};

class Section extends React.Component<IStateProps & IDispatchProps & ISectionProps, any> {

  componentDidMount() {
    this.initialiseSection();
  }

  initialiseSection() {
    const {id} = this.props;
    this.props.onConstruction(id);
  }

  render() {
    const props = getProps(this.props);
    return (
      <SectionComponent {...props}/>
    );
  }
}

export default connect<IStateProps, IDispatchProps, IStateProps & IDispatchProps & ISectionProps>
(mapStateToProps, mapDispatchToProps)(Section);
