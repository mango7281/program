var express = require('express');
var router = express.Router();
var adModel = require('../model/ads')

/* 新增 */
router.post('/create', function(req, res, next) {
  var { title, src } = req.body
  var ele = {
    title,
    src,
    user_id: 'xia',
    create_time: Date.now()
  }
  adModel.insertMany([ele]).then(()=>{
    res.json({err:0,msg:'succuess'})
  })
});

router.get('/list', function(req, res) {
  adModel.find().then(arr=>{
    res.json({err:0, msg:'succuess', data: arr})
  })
})

router.get('/del', function(req, res) {
  let { id } = req.query
  adModel.deleteOne({_id:id}).then(()=>{
    res.json({err:0, msg:'succuess'})
  })
})


module.exports = router;
