const jwt = require('jsonwebtoken');
const secreKey = 'JSistheBEst';

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: '未提供身份验证令牌' });
  }

  jwt.verify(token.split('Bearer ')[1], secreKey, (err, user) => {
    if (err) {
      console.log('error:',err);
      return res.status(403).json({ error: "身份验证失败" });
    }
    console.log('success');
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;