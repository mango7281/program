<template lang="html">
<div class="user-info">
  <van-row type='flex' justify='center' align='center'>
    <van-col span='6'>
      <van-cell center>
        <van-image
          round
          width='1.6rem'
          height='1.6rem'
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-cell>

    </van-col>
    <van-col span='18'>
      <div>GeekXia</div>
      <div>xiahaifeng</div>
      <div><span>京享值50098</span> <span>小白信用95.8 ></span></div>
    </van-col>
  </van-row>
</div>
</template>

<script>
import {
  Row,
  Col,
  Image,
  Cell
} from 'vant'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [Cell.name]: Cell
  }
}
</script>

<style lang="scss" scoped>
.user-info {
  background-color: rgb(231,170,94);
  padding: .13rem 0;
  padding-bottom: .27rem;
  color: #fff;
  line-height: .53rem;
  font-size: .37rem;
}
.van-image {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
}
.van-cell {
  background-color: transparent;
}
</style>
