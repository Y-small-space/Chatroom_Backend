const express = require('express');
const app = express();

app.use((req,res,next)=>{
  let referer = req.get('referer');
  let url = new URL(referer);
  let hostname = url.hostname;

  if(hostname !== '127.0.0.1'){
    res.status
  }
  console.log(host);
  next();
})