function renderHtml(url){
  switch (url) {
    case "/home":
      return `
      <html>
        <div>home-page<?>
      </html>
      `
    case "/list":
      return`
        ["list1","list2","list3"]
      `

    default:
      return `
        <html>
          <div>not found</div>
        </html>
      `
  }
}

exports.renderHtml = renderHtml