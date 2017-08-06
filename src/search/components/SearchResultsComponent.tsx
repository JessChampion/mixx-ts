import * as React from 'react';

import './searchResults.css';

export interface ISearchFormComponentProps {
  addSeedTrack: any;
  data: any;
  loading: boolean;
}

export default class SearchResultsComponent extends React.Component<ISearchFormComponentProps, any> {

  renderLoading() {
    return (
      <div className="searchResults">
        <div className="resultsHolder">
          <div className="loadingIndicator">loading...</div>
        </div>
      </div>
    );
  }

  renderResults(results: any) {
    return (
      <div className="searchResults">
        <div className="resultsHolder">
          {results.map((item: any, index: number) => this.renderResult(item, index))}
        </div>
      </div>
    );
  }

  renderResult(result: any, index: number) {
    const addSeedTrack = this.props.addSeedTrack;
    return (
      <div className="result"
           key={index}
           onClick={() => addSeedTrack(result)}>
        <div className="details">
          {/*<i className="fa fa-music" aria-hidden="true"/>*/}
          <span className="track">{result.name}</span>
          <span className="artist">{result.artist}</span>
        </div>
      </div>
    );
  }

  render() {
    const {
      data,
      loading
    } = this.props;
    let content = null;
    if (loading) {
      content = this.renderLoading();
    }
    if (data.length > 0) {
      content = this.renderResults(data);
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}
