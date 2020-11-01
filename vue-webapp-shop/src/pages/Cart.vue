<template lang="html">
<div class="cart">

  <!-- 顶部导航栏 -->
  <van-nav-bar
    title="购物"
    left-text="返回"
    right-text="..."
    left-arrow
    @click-left="onBack"
    fixed
  >
    <template #right>
      <van-icon name="underway-o" />
    </template>
  </van-nav-bar>

  <!-- 购物车商品列表 -->
  <div class="cart-good" v-for='(item,index) in list' :key='item._id'>
    <van-swipe-cell>
      <van-row type="flex" justify='center' align='center'>
        <van-col span='4'>
          <van-cell>
            <van-checkbox @change='checkChange(index, $event)' v-model="item.checked" />
          </van-cell>
        </van-col>
        <van-col span='20'>
          <van-card
            :num="item.num"
            :price="item.good.price"
            :desc="item.good.desc"
            :title="item.good.name"
            :thumb="item.good.img"
          >
            <template #footer>
              <van-button size="mini" @touchstart='onUpdate("sub", item)'>-</van-button>
              <van-button size="mini" @touchstart='onUpdate("add", item)'>+</van-button>
            </template>
          </van-card>
        </van-col>
      </van-row>
      <template #right>
        <van-button @touchstart='onDelete(item)' square text="删除" type="danger" class="delete-button" />
      </template>
    </van-swipe-cell>
  </div>

  <!-- 底部提交 -->
  <van-submit-bar :price="total" button-text="提交订单" @submit="onSubmit">
    <van-checkbox v-model="full">全选</van-checkbox>
    <template #tip>
      你的收货地址不支持同城送, <span class="edit" @click="editAddr">修改地址</span>
    </template>
  </van-submit-bar>

</div>
</template>

<script>
import {
  SubmitBar,
  Checkbox,
  NavBar,
  Icon,
  Card,
  Button,
  Row,
  Col,
  Cell,
  SwipeCell,
  Toast
} from 'vant'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'Cart',
  components: {
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [SwipeCell.name]: SwipeCell
  },
  data: function() {
    return {}
  },
  computed: {
    ...mapState('cart', ['list']),
    ...mapGetters('cart', ['total', 'full'])
  },
  watch: {
    checked: function(newVal) {
      this.updateListAll(newVal)
    }
  },
  mounted() {
    this.getCartList({})
  },
  methods: {
    ...mapActions('cart', ['getCartList']),
    ...mapMutations('cart', ['updateListItem', 'updateListAll']),
    editAddr() {
      // 跳转到地址修改页面
    },
    onBack() {
      // 返回上一页
      this.$router.replace('/home')
    },
    onDelete(item) {
      // 删除一条记录
      let params = {
        id: item._id
      }
      this.$http.deleteCart(params).then(()=>{
        // 刷新购物车
        Toast('删除成功')
        this.getCartList({})
      })
    },
    onUpdate(type, item) {
      // 修改商品数量
      if (type=='sub' && item.num==1) return Toast('数量不能小于1')
      let data = {
        id: item._id,
        num: type=='sub' ? item.num-1 : item.num+1
      }
      this.$http.updateCart(data).then(()=>{
        Toast('数量修改成功')
        // 刷新购物车
        this.getCartList({})
      })
    },
    checkChange(index, check) {
      this.updateListItem({index,check})
    },
    onSubmit() {
      // 提交订单
      let str = ''
      this.list.map(ele=>{
        if (ele.checked) {
          str += (';'+ele._id)
        }
      })
      console.log('str', str)
      let data = {
        goods: str
      }
      this.$http.submitCart(data).then(()=>{
        // 刷新购物车
        this.getCartList({})
        this.$router.replace('/home')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  padding-bottom: 1.6rem;
  padding-top: 2rem;
  .edit {
    color: blue;
  }
  .test {
    height: .67rem;
    border: 1px solid red;
  }
  .cart-good {
    border-bottom: 1px solid #eee;
  }
  .van-card {
    padding-left: 0;
    background: #ffffff;
  }
  .delete-button {
    height: 100%;
  }
}
</style>
