const axios = require('axios')
const config = require('./config')
const apiBase = 'https://api.github.com'

const http = axios.create({
  baseURL: apiBase,
  headers: {
    Authorization: `token ${config.GITHUB_PERSONAL_ACCESS_TOKEN}`,
  },
})

module.exports = {
  http,
}
