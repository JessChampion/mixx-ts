module.exports = {
  parser: require('postcss-scss'),
  plugins: [
    require('postcss-smart-import')(),
    require('postcss-css-variables')(),
    require('precss')(),
    require('postcss-calc')(),
    require('postcss-font-magician')({
      hosted: ['./public/fonts', '/fonts'],
      variants: {
        'Permanent Marker': {
          '400': []
        },
        'Quicksand': {
          '400': [],
          '700': []
        }
      },
      foundries: ['google']
    })
  ]
};