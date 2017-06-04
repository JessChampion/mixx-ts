import * as R from 'ramda';
import * as React from 'react';

import './section.css';

// interface ISectionProps {
//   id: string;
//   title: string;
//   expanded: boolean;
//   toggleHandler: any;
//   children?: any;
// }

export default class SectionComponent extends React.Component<any, any> {
  renderContent(children: any) {
    return (
      <div className="section-body">
        {children}
      </div>
    );
  }

  renderToggle(expanded: boolean, toggleEvent: any) {
    const expandedClasses = R.concat('toggle-icon ')(expanded ? 'expanded' : 'collapsed');
    return (
      <div className="toggle"
           onClick={() => toggleEvent()}
      >
        <i className={expandedClasses}/>
      </div>
    );
  }

  render() {
    const {
      children,
      expanded,
      id,
      title,
      toggleHandler
    }: any = this.props;

    const classes = id + ' section collapsible';
    const toggle = this.renderToggle(expanded, toggleHandler);
    const content = expanded ? this.renderContent(children) : '';
    return (
      <section className={classes} id={id}>
        <div className="section-header">
          <h2>
            {title}
          </h2>
          {toggle}
        </div>
        {content}
      </section>
    );
  }
}
