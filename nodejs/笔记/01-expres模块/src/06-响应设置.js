const express = require('express');
const app = express();

app.get('/response',(req,res)=>{
  //原生响应
  // res.statusCode = 404;
  // res.statusMessage = 'love';
  // res.setHeader = ('xxx','yyy');
  // res.write('hello express');
  // res.end('hello express');

  // express响应
  res.status(500);
  res.set('aaa','bbb');
  res.send('hello express');
  res.status(500).set('abc','def').send('it`s ok!');
})

app.listen(3000,()=>{
  console.log('server on...');
})