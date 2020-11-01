<template lang="html">
<div class="find">

  <div class="find-left">
    <van-sidebar v-model="activeKey">
      <van-sidebar-item
        v-for='item in cates'
        :key='item._id'
       :title='item.cate_zh' />
    </van-sidebar>
  </div>

  <div class="find-right">
    <div v-for='i in 20' :key='i'>
      <van-grid column-num='3'>
        <van-grid-item>
          <template>
            <div class="find-good">
              <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <div>名字</div>
            </div>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template>
            <div class="find-good">
              <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <div>名字</div>
            </div>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template>
            <div class="find-good">
              <van-image src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <div>名字</div>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>


  <TabBar></TabBar>
</div>
</template>

<script>
import {
  Sidebar,
  SidebarItem,
  Grid,
  GridItem,
  Image
} from 'vant'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Find',   // name选项的作用是给当前取个名字，便于在devtools查看
  components: {
    TabBar: ()=>import('@/components/common/TabBar.vue'),
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image
  },
  data: function() {
    return {
      activeKey: 0,
      cates: []
    }
  },
  computed: {
    ...mapState('find', ['cateObj'])
  },
  watch: {
    activeKey: function(newVal) {
      // 先判断缓存中有没有数据，当没有时才需要调接口
      if (this.cateObj[newVal]) return
      this.getGoods()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapMutations('find',['updateCateObj']),
    // 把异步方法变成同步执行
    async init() {
      let arr = await this.$http.getAllCates({})
      this.cates = arr
      this.getGoods()
    },
    getGoods() {
      let params = {
        cate: this.cates[this.activeKey].cate
      }
      this.$http.getGoodOfCate(params).then(res=>{
        let payload = {
          idx: this.activeKey,
          key: params.cate,
          val: res
        }
        // 把请求到数据，缓存到状态管理工具中去
        // 不建议使用localStorage来做缓存
        this.updateCateObj(payload)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.find {
  .find-left {
    position: absolute;
    left: 0;
    bottom: 1.6rem;
    top: 0;
    width: 2.27rem;
    overflow: auto;
    // 在移动端有absolute产生滚动条，使用下面这个属性，可以更加流畅
    overflow-scrolling : touch;
  }
  .find-right {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 1.6rem;
    left: 2.27rem;
    background-color: orange;
    overflow: auto;
    overflow-scrolling : touch;
  }
  .find-good {
    &>div {
      font-size: .4rem;
      text-align: center;
    }
  }
}
</style>
