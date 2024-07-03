/* eslint-disable */
'use strict'

var ghpages = require('gh-pages')

ghpages.publish('build', function (err) {
  console.err(err)
})
