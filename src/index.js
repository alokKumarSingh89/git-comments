const chalk = require('chalk')
const axios = require('axios')
const minimist = require('minimist')
const config = require('./config')
const { pullComment, merge } = require('./comments')

const apiBase = 'https://api.github.com'

const http = axios.create({
  baseURL: apiBase,
  headers: {
    Authorization: `token ${config.GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
})
function log(message) {
  process.stdout.write(message)
}

async function start() {
  const args = minimist(process.argv.slice(2))
  let messages = '\n    Fetching comments'
  const repo = args['repo']
  if (!repo) {
    throw new Error('Repo is required')
  }

  let period = parseInt(args['period'] || '-1', 10)
  if (period >= 1) {
    messages += ` ${chalk.blue('for')} past ${period} days`
  }
  messages += ` ${chalk.blue('for')} ${chalk.yellowBright(`"${repo}"`)}...\n\n`
  log(messages)
  log('    ')
  let COMMIT_URL = config.COMMIT_URL.replace(/REPOSITORY/, repo)
  let PULL_URL = config.PULL_URL.replace(/REPOSITORY/, repo)
  let ISSUE_URL = config.ISSUE_URL.replace(/REPOSITORY/, repo)
  Promise.all([
    pullComment(COMMIT_URL, http, period, log, 'commit comment'),
    // pullComment(PULL_URL, http, period, log, 'pull comment'),
    // pullComment(ISSUE_URL, http, period, log, 'issue comment'),
  ]).then((res) => {
    let data = {}
    data = merge(res[0], data)
    if (res[1]) {
      data = merge(res[1], data)
    }
    if (res[2]) {
      data = merge(res[2], data)
    }
    console.log(data)
  })
}

start()
