# MIXX

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## TODO
- ~~Setup postcss~~
- Intergrate post css with webpack.
    *This will involve ejecting create-react-app so will put up with seperate configuration for now.*
- Bring over original mix code.
    - ~~Router~~
    - ~~Section component~~
    - ~SearchForm~
    - ~SearchResults~
    - Seeds
    - CreateButton
    - Playlist
    - SavePlaylist
- ~~Setup Store~~
- ~Restore the store from storage (lol.).~
- Redirect to login when token is expired
- New Styling
    - ~~Login~~
    - 404s
    - Main
        - Header
        - ~~Section~~

- Add seed from my library
- Sections have open next functionality to push the user through the flow

## TECHNICAL DOCUMENTATION

### Setup

1. Install node/npm
2. Install postcss-cli
   `npm install -g postcss-cli`

### Running
#### `npm run postcss`

Compiles our `.pcss` files into `.css` which is imported by our components.
Run npm start in a separate terminal tab.

#### `npm run start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### Testing
#### `npm run test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](README_CREATE_REACT_APP.md/#running-tests) for more information.


### Building
`npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](README_CREATE_REACT_APP.md/#deployment) for more information.

**NOTE: make sure to run `npm run postcss` first**

