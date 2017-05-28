
module.exports = {
  parser: require('postcss-scss'),
  plugins: [
    require('postcss-cssnext')(),
    require('postcss-nested')(),
  ]
};