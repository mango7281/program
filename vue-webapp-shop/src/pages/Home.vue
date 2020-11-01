<template>
<div class="home">
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

    <!-- 顶部提示框 -->
    <van-notice-bar
      left-icon='volume-o'
      background='#B20D07'
      color='#ffffff'
      scrollable
      mode="closeable">
      打开京东App，购物更轻松; 京东618，秒杀全场！手快可抢618元大红包！
    </van-notice-bar>

    <!-- 搜索框 -->
    <van-search
      shape="round"
      background="#B20D07"
      :placeholder="tips"
      show-action
      disabled
    >
      <template #action>
        <div class="login" @click="skipToLogin">登录</div>
      </template>
    </van-search>

    <!-- 轮播图 -->
    <van-swipe class="home-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for='item in swiperArr' :key='item.id'>
        <van-image
          fit="contain"
          :src="img.baseUrl+item.src"
        />
      </van-swipe-item>
    </van-swipe>

    <!-- 分隔线 -->
    <van-divider>
      <template>
        <div class="hot">为你推荐</div>
      </template>
    </van-divider>

    <!-- 列表 -->
    <van-list
      finished-text="没有更多了"
      :finished="finished"
      v-model="loading"
      @load="onLoad"
      :immediate-check='false'
      offset='50'
    >
      <!-- v-for循环一个数字时，是从1开始 -->
      <div v-for="i in len" :key="i">
        <Good :good='list[2*(i-1)]'></Good>
        <Good :good='list[2*(i-1)+1]'></Good>
      </div>
    </van-list>
  </van-pull-refresh>


  <TabBar></TabBar>

</div>
</template>

<script>
import {
  NoticeBar,
  Search,
  Swipe,
  SwipeItem,
  Image,
  Divider,
  PullRefresh,
  List,
  Toast
} from 'vant'
import img from '@/utils/img'
export default {
  name: 'Home',
  components: {
    TabBar: ()=>import('@/components/common/TabBar.vue'),
    Good: ()=>import('@/components/common/Good.vue'),
    [NoticeBar.name]: NoticeBar,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    [Divider.name]: Divider,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh
  },
  data: function() {
    return {
      img,
      refreshing: false,
      list: [],
      page: 1,
      finished: false,
      loading: false,
      total: 0,
      swiperArr: []
    }
  },
  computed: {
    tips: function() {
      var arr = ['九阳热水壶','Mac Pro', '笔记本电脑']
      return arr[Math.floor(Math.random()*3)]
    },
    len: function() {
      return Math.floor(this.list.length/2)
    }
  },
  mounted() {
    this.getList()
    // 获取广告数据
    this.$http.getAds({}).then((res)=>{
      console.log('广告来了')
      this.swiperArr = res
    })
  },
  methods: {
    skipToLogin() {
      // 跳转去登录页
    },
    onRefresh() {
      this.page = 1
      this.getList()
    },
    onLoad() {
      this.loading = true
      this.page++
      if (this.total > this.list.length) {
        this.getList()
      }

    },
    getList() {
      let params = {
        // hot: true,
        page: this.page
      }
      this.$http.getHotGoodList(params).then(res=>{
        this.total = res.total

        // console.log('商品列表====', res)
        if (res.list.length < 10) {
          Toast('没有更多了')
        }
        if (this.refreshing) {
          this.list = res.list
        } else {
          this.list = [...this.list, ...res.list]
        }
        this.finished = false
        this.refreshing = false
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>

@import '@/assets/common.scss';
// @import '../assets/common.scss';
.home {
  .login {
    color: #ffffff;
  }
  .van-swipe-item {
    .van-image {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .van-divider {
    border-color: #B20D07;
    .hot {
      color: #B20D07;
      font-size: .4rem;
      font-weight: bold;
    }
  }

}

</style>
