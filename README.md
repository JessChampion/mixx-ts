# MIXX

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## TODO

- Intergrate post css with webpack.
    This will involve ejecting create-react-app so will put up with seperate configuration for now.
- Bring over original mix code.


## TECHNICAL DOCUMENTATION

### Setup

1. Install node/npm
2. Install postcss-cli
   `npm install -g postcss-cli`

### Running
#### `npm postcss`

Compiles our `.pcss` files into `.css` which is imported by our components.
Run npm start in a separate terminal tab.

#### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### Testing
#### `npm test`

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

