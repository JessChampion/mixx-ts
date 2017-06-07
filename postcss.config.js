module.exports = {
  parser: require('postcss-scss'),
  plugins: [
    require('postcss-smart-import')(),
    require('postcss-custom-properties')(),
    require('precss')(),
    require('postcss-calc')(),
    require('postcss-color-function')(),
    require('postcss-normalize')(),
    require('postcss-font-magician')({
      hosted: ['./public/fonts', '/fonts'],
      variants: {
        'Permanent Marker': {
          '400': []
        },
        'Comfortaa': {
          '300': [],
          '400': [],
          '700': []
        }
      },
      foundries: ['google']
    })
  ]
};