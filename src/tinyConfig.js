const tinify = require('tinify')

const TINI_API_KEY = 'ndwYBSblhVW83Yh4zBM1CdHz4jrDGtkq'

tinify.key = TINI_API_KEY

function checkApiKeyValid(key) {
  return new Promise((resolve, reject) => {
    tinify.validate(function (err) {
      if (err) {
        resolve(false)
        return
      }
      resolve(true)
    })
  })
}

tinify.checkApiKeyValid = checkApiKeyValid

module.exports = tinify
