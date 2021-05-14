const fs = require('fs')

function checkDirIsExist(dir) {
  return new Promise((resolve, reject) => {
    fs.access(dir, (err) => {
      if (err) {
        resolve(false)
      }
      resolve(true)
    })
  })
}

module.exports = {
  checkDirIsExist
}
