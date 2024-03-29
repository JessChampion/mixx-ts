﻿// import * as React from 'react';
// // import {Link} from 'react-router';
// // import CreateButton from '../components/CreateButton';
// // import Playlist from '../components/Playlist';
// // import SavePlaylist from '../components/SavePlaylist';
// // import SearchForm from '../components/SearchForm';
// // import SearchResults from '../components/SearchResults';
// // import SectionContainer from '../components/SectionContainer';
// // import Seeds from '../components/Seeds';
//
// export default class MainView extends React.Component<any, any> {
//   render() {
//     return (
//       <div className="mainView">
//         <div className="headerBar">
//           <div className="header section">
//             <h1>MIX</h1>
//           </div>
//           {/*<div><Link to="/about">About</Link></div>*/}
//         </div>
//         <SectionContainer id="searchView" title="Add seed tracks">
//          <SearchForm/>
//          <SearchResults/>
//          </SectionContainer>
//          <SectionContainer id="seedTracks" title="Seed tracks">
//          <Seeds/>
//          <CreateButton/>
//          </SectionContainer>
//          <SectionContainer id="playlistView" title="The Mix">
//          <Playlist/>
//          </SectionContainer>
//          <SectionContainer id="savePlaylist" title="Save this Mix">
//          <SavePlaylist/>
//          </SectionContainer>
//       </div>
//     );
//   }
// };
import * as React from 'react';

import './mainView.css';

import SearchForm from '../search/SearchForm';
import SearchResults from '../search/SearchResults';
import Seeds from '../settings/Seeds';
import Section from './components/Section';

export default class Main extends React.Component<any, any> {
  render() {
    return (
      <div className="mainView">
        <header className="headerBar">
          <div className="header">
            <h1>MIX</h1>
          </div>
        </header>
        <Section id="searchView" title="Add seed tracks">
          <SearchForm/>
          <SearchResults/>
        </Section>
        <Section id="seedTracks" title="Seed tracks">
          <Seeds/>
        </Section>
      </div>
    );
  }
}
