var express = require('express');
var router = express.Router();
var userModel = require('../model/users')
var jwt = require('../utils/jwt')

// 用户注册
router.post('/regist', function(req, res) {
  var { username, password, role } = req.body

  // 必填与非必须验证
  if (!username) return res.json({err:1,msg:'缺少必填参数'})
  if (!password) return res.json({err:1,msg:'缺少必填参数'})
  // 数据类型及数据格式（需求）
  if (!/[a-zA-Z]{3,16}/.test(username)) {
    return res.json({err:2,msg:'用户名要求是3-16位纯字母组成'})
  }
  if (!/^[a-zA-Z][a-zA-Z0-9\@\_\-]{5,17}$/.test(password)) {
    return res.json({err:2,msg:'密码不符合要求'})
  }
  // 业务需求验证
  userModel.find({username}).then(arr=>{
    if(arr && arr.length > 0) {
      res.json({err:3, msg: '用户名已被占用'})
    } else {
      // 入库
      var ele = {
        username,
        password, // 加密
        role: role ? role : 1,
        create_time: Date.now()
      }
      userModel.insertMany([ele]).then(()=>{
        res.json({err:0,msg:'succuess',data: {username}})
      })
    }
  })
})

// 用户登录
router.post('/login', function(req, res) {
  var { username, password } = req.body

  // 必填与非必须验证
  if (!username) return res.json({err:1,msg:'缺少必填参数'})
  if (!password) return res.json({err:1,msg:'缺少必填参数'})
  // 查询集合，如果有这条记录就是登录成功
  userModel.find({username,password}).then(arr=>{
    if(arr && arr.length>0) {
      // 其它集合的查询
      res.json({err:0, msg:'succuess', data: {
        navs: [],
        role: 1,
        username,
        avatar: '',
        token: jwt.createToken({username,password})
      }})
    }
  })


})

module.exports = router;
