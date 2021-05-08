#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const tinify = require('./tinyConfig')

const outputDirName = 'output'
const dir = process.cwd()
const outputDirPath = path.resolve(dir, outputDirName)

function createDir(dir) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dir, () => {
      resolve(true)
    })
  })
}

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

function compress(dir, outputDir) {
  let num = 0
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.log(err)
      return
    }
    const reg = /\.(png|jpeg|jpg)$/
    const filesList = files.filter((file) => reg.test(file))
    console.log(filesList)
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

async function run(dir, outputDirPath) {
  let isValid = await tinify.checkApiKeyValid()
  if (!isValid) {
    console.log('Api key is invalid!')
    return
  }
  const isExist = await checkDirIsExist(outputDirPath)

  if (!isExist) {
    await createDir(outputDirPath)
    compress(dir, outputDirPath)
  } else {
    compress(dir, outputDirPath)
  }
}

run(dir, outputDirPath)
