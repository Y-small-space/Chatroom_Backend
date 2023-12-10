function queryStringfy(obj) {
  let str = ''
  for (let k in obj) str += `${k}=${obj[k]}&`
  return str.slice(0, -1)
}

// 封装Ajax
function ajax(options) {
  let defaultoptions = {
    url: "",
    method: "GET",
    async: true,
    data: {},
    headers: {},
    success: function () { },
    error: function () { }
  }

  let { url, method, async, data, headers, success, error } = {
    ...defaultoptions,
    ...options
  }

  if (typeof data === 'object' && headers["content-type"]?.indexOf("json") > -1) {
    data = JSON.stringify(data)
  }

  console.log(url, method, async, data, headers, success, error)

  if (typeof data === 'object' && headers["content-type"]?.indexOf("json") > -1) {
    data = JSON.stringify(data)
  } else {
    data = queryStringfy(data)
  }

  if (/^get$/i.test(method) && data) url += '?' + data


  const xhr = new XMLHttpRequest()
  xhr.open(method, url, async)
  xhr.onload = function(){
    if(!/^2\d{2}$/.test(xhr.status)){
      error(`错误状态码：${xhr.status}`)
      return
    }
    
    //执行解析
    try{
      let result = JSON.parse(xhr.responseText)
      success(result) // 回调函数
    }catch(err){
      error('解析失败！因为后端返回结果不是json格式')
    }
  }

  // // 设置请求头内的信息
  for (let k in headers) xhr.setRequestHeader(k,headers[k])

  if(/^get$/i.test(method)){
    xhr.send()
  }else{
    xhr.send(data)
  }
  xhr.send()
}
