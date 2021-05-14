const fs = require('fs')
const tinify = require('./tinyConfig')
function compress(dir, outputDir) {
  let num = 0
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.log(err)
      return
    }
    const reg = /\.(png|jpeg|jpg)$/
    const filesList = files.filter((file) => reg.test(file))
    console.log(`slected imgs: ${filesList}`)
    filesList.forEach(async (file) => {
      const source = tinify.fromFile(`${dir}/${file}`)
      await source.toFile(`${outputDir}/compress-${file}`)
      num++
      if (num === filesList.length) {
        console.log('compress is sucessful')
      }
    })
  })
}

module.exports = {
  compress
}
