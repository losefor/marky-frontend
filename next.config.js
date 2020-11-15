// next.config.js
const withSass = require('@zeit/next-sass')
module.exports = withSass({
  /* config options here */
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({})