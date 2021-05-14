const fs = require('fs')
function createDir(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, () => {
      resolve(true)
    })
  })
}

module.exports = {
  createDir
}
