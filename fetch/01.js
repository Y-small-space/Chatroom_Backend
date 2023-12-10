fetch("http:localhost:3000")
.then((res)=>{
  if(res.ok){
    return res.json()
  }else{
    return Promise({
      a:1,
      status:res.status,
      statusText:res.statusText
    })
  }
})
.then(res=>console.log(res))
.catch(error=>console.log(error))