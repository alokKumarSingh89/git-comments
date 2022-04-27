const moment = require('moment')
async function pullComment(repo, http, period, callback, page = 0) {
  const data = {}
  try {
    callback('*')
    const url = `${repo}?page=${page}`
    const res = await http.get(url)
    if (res.data.length <= 0) {
      return data
    }
    console.log(res.data)
    res.data.forEach((item) => {
      if (
        period > -1 &&
        !moment().subtract(period, 'days').isBefore(moment(item.created_at))
      ) {
        return
      }
      console.log(
        moment().subtract(period, 'days').isBefore(moment(item.created_at)),
        item,
      )
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
    let newData = await pullComment(repo, http, period, callback, page + 1)
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
