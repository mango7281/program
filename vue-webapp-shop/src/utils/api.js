import fetch from './fetch'  // fetch实际上一个axios实例（promise对象）

// ES6 模块：任何一个js文件都可以看成是一个独立作用域的模块

// 第一种写法
// export aaa
// export bbb
// import { aaa, bbb } from './xxx.js'

// 第二种写法：在同一个模块中，最多只能使用一次 export default
// export default
// import ccc from './xxx.js'

// 注册接口
export function regist(data) {
  return fetch({
    url: '/users/regist',
    method: 'POST',
    data
  })
}
// 登录接口
export function login(data) {
  return fetch({
    url: '/users/login',
    method: 'POST',
    data
  })
}

// 获取首页为你推荐的商品列表
export function getHotGoodList(params) {
  return fetch({
    url: '/good/list',
    method: 'GET',
    params
  })
}

// 获取商品详情
export function getGoodDetail(params) {
  return fetch({
    url: '/good/detail',
    method: 'GET',
    params
  })
}

// 加入购物车
export function addToCart(data) {
  return fetch({
    url: '/good/add',
    method: 'POST',
    data
  })
}

// 获取购物车列表
export function getCartList(params) {
  return fetch({
    url: '/cart/list',
    method: 'GET',
    params
  })
}

// 删除一条购物记录
export function deleteCart(params) {
  return fetch({
    url: '/jd/deleteToCart',
    method: 'GET',
    params
  })
}

// 修改购物车中商品的数量
export function updateCart(data) {
  return fetch({
    url: '/jd/updateCartNum',
    method: 'POST',
    data
  })
}

// 提交购物车
export function submitCart(data) {
  return fetch({
    url: '/jd/submitToCart',
    method: 'POST',
    data
  })
}

// 获取所有品类
export function getAllCates(params) {
  return fetch({
    url: '/jd/getAllCates',
    method: 'GET',
    params
  })
}

// 基于品类进行筛选
export function getGoodOfCate(params) {
  return fetch({
    url: '/jd/getCateGoodList',
    method: 'GET',
    params
  })
}

export function getAds(params) {
  return fetch({
    url: '/ad/list',
    method: 'GET',
    params
  })
}

// 把所有接口方法统一抛出
export default {
  regist,
  login,
  getHotGoodList,
  getGoodDetail,
  addToCart,
  getCartList,
  deleteCart,
  updateCart,
  submitCart,
  getAllCates,
  getGoodOfCate,
  getAds
}
