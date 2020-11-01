<template lang="html">
<div class="user">
  <UserInfo></UserInfo>

  <!-- 订单状态 -->
  <van-grid>
    <van-grid-item icon="home-o" text="待付款" badge='1' />
    <van-grid-item icon="search" text="待收货" badge="10" />
    <van-grid-item icon="home-o" text="退换/售后" />
    <van-grid-item icon="search" text="全部订单" badge="99+" />
  </van-grid>

  <!-- CellGroup -->
  <van-cell-group title="地址">
    <van-cell value="管理我的地址" is-link>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">收货地址管理</span>
      </template>
    </van-cell>
  </van-cell-group>

  <van-cell-group title="安全">
    <van-cell value="密码实名认证等管理" is-link>
      <template #title>
        <span class="custom-title">账户与安全</span>
      </template>
    </van-cell>
    <van-cell value="未设置" is-link>
      <template #title>
        <span class="custom-title">京东支付密码</span>
      </template>
    </van-cell>
  </van-cell-group>

  <van-cell-group title="服务">
    <van-cell value="即时解答用户疑难" is-link>
      <template #title>
        <span class="custom-title">联系客服</span>
      </template>
    </van-cell>
    <van-cell value="" is-link>
      <template #title>
        <span class="custom-title">切换站点</span>
      </template>
    </van-cell>
  </van-cell-group>

  <!-- 功能按钮 -->
  <van-grid direction="horizontal" :column-num="3">
    <van-grid-item icon="service-o" text="意见反馈" />
    <van-grid-item icon="balance-o" text="京东客户端" />
    <van-grid-item icon="user-circle-o" text="退出登录" />
  </van-grid>

  <TabBar></TabBar>
</div>
</template>

<script>
import {
  Grid,
  GridItem,
  Cell,
  CellGroup
} from 'vant'
export default {
  components: {
    TabBar: ()=>import('@/components/common/TabBar.vue'),
    UserInfo: ()=>import('@/components/user/UserInfo.vue'),
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  }
}
</script>

<style lang="scss" scoped>
.user {
  background-color: rgb(247, 247, 247);
}
</style>
