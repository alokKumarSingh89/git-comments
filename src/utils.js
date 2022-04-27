const leftPad = require('left-pad')
function log(message) {
  process.stdout.write(message)
}
function sortBasedonCommnetAndReturnArray(data) {
  const arr = []
  for (let key in data) {
    arr.push({
      name: key,
      commit: data[key].commit,
      comment: data[key].comment,
    })
  }
  arr.sort((b, a) =>
    a.comment > b.comment ? 1 : b.comment > a.comment ? -1 : 0,
  )

  return arr
}
function print(data) {
  let sortedData = sortBasedonCommnetAndReturnArray(data)
  console.log('\n')
  sortedData.forEach((obj) => {
    console.log(
      `${leftPad(obj.comment, 4)} comments, ${obj.name} (${
        obj.commit
      } commits)`,
    )
  })
}

module.exports = {
  print,
  log,
}
