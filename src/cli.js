const fs = require('fs')
const path = require('path')
const tinify = require('./tinyConfig')
const { createDir } = require('./createDir')
const { checkDirIsExist } = require('./verify')
const { compress } = require('./compress')

const argv = require('yargs')
  .option('v', {
    alias: 'version'
  })
  .option('o', {
    alias: 'out',
    default: 'output',
    describe: 'the dir that store compressed imgs',
    type: 'string'
  })
  .usage('Usage: tingyImgs [options]')
  .help('h')
  .alias('h', 'help')
  .epilog('copyright 2021').argv

function generateOperation() {
  const operations = []
  if (argv.o || argv.out) {
    operations.push('out')
  }

  return operations
}

// 执行任务的目录
const dir = process.cwd()

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

function runCli() {
  const operations = generateOperation()
  operations.forEach((op) => {
    switch (op) {
      case 'out':
        const outputDirPath = path.resolve(dir, argv.o)
        run(dir, outputDirPath)
        break
      default:
        console.log('compress all imgs')
    }
  })
}

module.exports = {
  runCli
}
