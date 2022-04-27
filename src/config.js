module.exports = {
  GITHUB_PERSONAL_ACCESS_TOKEN: require('./token'),
  COMMIT_URL: '/repos/REPOSITORY/comments?page=PAGE',
  PULL_URL:
    '/repos/REPOSITORY/pulls/comments?page=PAGE&sort=updated_at&direction=desc',
  ISSUE_URL:
    '/repos/REPOSITORY/issues/comments?page=PAGE&sort=updated_at&direction=desc',
}
