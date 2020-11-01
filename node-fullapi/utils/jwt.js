var jwt = require('jsonwebtoken')

// 生成token
function createToken(data) {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60*60*24), // 单位：秒
    data: data
  }, 'qfhappy')
}

// 验证token
function verifyToken(token) {
  return new Promise(function(resolve, reject) {
    try {
      var decoded = jwt.verify(token, 'qfhappy');
      console.log('token', decoded)
      resolve(decoded.data)
    } catch(err) {
      reject(err)
    }
  })
}

module.exports = {
  createToken,
  verifyToken
}
