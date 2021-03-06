const moment = require('moment')
const { http } = require('./axiosHttp')
const { log } = require('./utils')
async function pullComment(repo, period, page = 0) {
  const data = {}
  try {
    log('*', ' ', 5)
    const url = repo.replace('PAGE', page)
    const res = await http.get(url)
    if (res.data.length <= 0) {
      return data
    }
    res.data.forEach((item) => {
      if (
        period > -1 &&
        !moment().subtract(period, 'days').isBefore(moment(item.created_at))
      ) {
        return
      }
      if (data[item.user.login]) {
        data[item.user.login] = {
          comment: item.body
            ? data[item.user.login].comment + 1
            : data[item.user.login].comment,
          commit: item.commit_id
            ? data[item.user.login].comment + 1
            : data[item.user.login].comment,
        }
      } else {
        data[item.user.login] = {
          comment: item.body ? 1 : 0,
          commit: item.commit_id ? 1 : 0,
        }
      }
    })
    let newData = await pullComment(repo, period, page + 1)
    return merge(newData, data)
  } catch (e) {
    return data
  }
}
function merge(from, to) {
  for (let key in from) {
    if (to[key]) {
      to[key] = {
        comment: to[key].comment + from[key].comment,
        commit: to[key].commit + from[key].commit,
      }
    } else {
      to[key] = from[key]
    }
  }
  return to
}
module.exports = {
  pullComment,
  merge,
}
