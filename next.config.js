const withPwa = require('next-pwa')

module.exports = withPwa({
  webpack5: true,
  pwa: {
    //disable: process.env.NODE_ENV !== 'production', // if mode development equal true than disabled
    dest: 'public',
    fallbacks: {
    image: '/assets/images/fallback.png',
    // document: '/other-offline',  // if you want to fallback to a custom    page other than /_offline
    // font: '/static/font/fallback.woff2',
    // audio: ...,
    // video: ...,
  }
  }
})
