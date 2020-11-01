var express = require('express');
var router = express.Router();
var goodModel = require('../model/goods')
var cateModel = require('../model/cates')
var articleModel = require('../model/article')


// 添加 or 更新
router.post('/add', function(req, res) {
  var { name, img, price, desc, hot, cate, id } = req.body
  var good = {
    hot : (hot ? hot : false),
    name,
    img,
    price,
    desc,
    cate
  }
  if (id) {
    goodModel.updateOne({_id:id}, good).then(()=>{
      res.json({err:0, msg:'修改成功'})
    })
  } else {
    goodModel.insertMany([good]).then(()=>{
      res.json({err:0, msg:'添加成功'})
    })
  }
})

// 删除
router.get('/del', function(req, res) {
  var { id } = req.query
  goodModel.deleteOne({_id:id}).then(()=>{
    res.json({err:0, msg:'删除成功'})
  })
})

// 查询
router.get('/list', function(req, res) {
  var { page, size, name, hot, cate, max_price, min_price, brand, shop_id } = req.query
  // 非必填数据处理
  page = parseInt(page ? page : 1)
  size = parseInt(size ? size : 10)
  var params = {
    hot: hot ? hot : false,
    // cate: cate ? cate : ''
  }
  if (!params.hot) delete params.hot

  console.log('-------------',params)

  goodModel.count(params).then(total=>{
    goodModel.find(params).skip((page-1)*size).limit(size).then(arr=>{
      res.json({err:0, msg:'success',data: {
        total: total,
        list: arr
      }})
    })
  })
})

// 商品详情
router.get('/detail', function(req, res) {
  var { good_id } = req.query
  goodModel.find({_id: good_id}).then(arr=>{
    res.json({err:0, msg:'success', data: arr[0]})
  }).catch(()=>{
    res.json({err: 1, msg:'没有找到当前商品'})
  })
})

// 所有品类
// 获取全部品类
router.get('/cates', function(req, res, next) {
  // 1 由小到大
  cateModel.find({}).sort({rank: 1}).then(arr=>{
    res.json({err:0,msg:'success',data:arr})
  }).catch(err=>{
    res.json({err:1,msg:'fail',err})
  })
})

// 文章
router.post('/create', function(req, res) {
  var { title, content } = req.body
  var article = {
    title,
    content,
    author: 'xia',
    create_time: Date.now()
  }
  articleModel.insertMany([article]).then(()=>{
    res.json({err:0, msg:'success'})
  })
})




module.exports = router;
