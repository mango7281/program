<template lang="html">
<div class="detail">

  <!-- 顶部navbar -->
  <van-nav-bar
    title="商品详情"
    left-text="返回"
    left-arrow
    fixed
    @click-left="onBack"
  />

  <h3 v-text='info.name'></h3>
  <img :src="img.baseUrl+info.img">

  <!-- 底部按钮群 -->
  <van-goods-action>
    <van-goods-action-icon icon="chat-o" text="客服" />
    <van-goods-action-icon icon="cart-o" text="购物车" />
    <van-goods-action-icon icon="shop-o" text="店铺" />
    <van-goods-action-button
      type="danger"
      text="立即购买"
      @click='addToCart'
    />
  </van-goods-action>
</div>
</template>

<script>
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  NavBar,
  Button,
  Toast
} from 'vant'
import img from '@/utils/img'
export default {
  name: 'Detail',
  components: {
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton,
    [NavBar.name]: NavBar,
    [Button.name]: Button
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      info: {},
      img
    }
  },
  mounted() {
    let params = {
      good_id: this.$route.params.id
    }
    this.$http.getGoodDetail(params).then(res=>{
      this.info = res
    })
  },
  methods: {
    onBack() {
      this.$router.back()
    },
    // 添加购物车
    addToCart() {
      let data = {
        good_id: this.info._id
      }
      this.$http.addToCart(data).then(()=>{
        Toast('添加成功')
        this.timer = setTimeout(()=>{
          this.$router.push('/cart')
        },1500)
      })
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.detail {
  padding-top: 1.33rem;
  text-align: center;
  &>img {
    display: block;
    width: 5rem;
    margin: 0 auto;
  }
}
</style>
