import * as React from 'react';

import './seeds.css';

export interface ISeedsComponentProps {
  seeds: any[];
  removeSeed: (id: string) => null;
}

export default class SeedsComponent extends React.Component<ISeedsComponentProps, any> {
  renderSeed(seed: any, index: number) {
    const {removeSeed} = this.props;
    const style = seed.imageUrl ? {backgroundImage: 'url(' + seed.imageUrl + ')'} : {};

    return (
      <div className="seed"
           key={index}
           style={style}
      >
        <i className="remove"
           onClick={() => removeSeed(seed.id)}
        >x</i>
        <div className="details">
          <div className="track">{seed.name}</div>
          <div className="artist">{seed.artist}</div>
        </div>
      </div>
    );
  }

  renderSeeds(seeds: any[]) {
    return (
      <div className="seedsHolder">
        <div className="wrap">
          {seeds.map((item, index) => this.renderSeed(item, index))}
        </div>
      </div>
    );
  }

  render() {
    const {seeds} = this.props;
    const empty = seeds.length <= 0;
    const content = !empty ? this.renderSeeds(seeds) : (
      <span className="emptySeeds">Get started by adding a seed track!</span>
    );

    return (
      <div className={empty ? 'seeds empty' : 'seeds'}>
        {content}
      </div>
    );
  }
}
