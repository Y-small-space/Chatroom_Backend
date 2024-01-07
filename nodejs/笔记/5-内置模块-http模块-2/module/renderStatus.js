function renderStatus(url) {
  let arr = ["/home", "/list"]

  return arr.includes(url) ? 200 : 404
}

exports.renderStatus = renderStatus