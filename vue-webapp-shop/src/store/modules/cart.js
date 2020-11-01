import { getCartList } from '@/utils/api'

export default  {
  namespaced: true,
  state: {
    list: []
  },
  getters: {
    total: function(state) {
      var t = 0
      state.list.map(ele=>{
        if (ele.checked) {
          t += ele.num * ele.good.price * 100
        }
      })
      return t
    },
    // 用于控制全选按钮
    full: function(state) {
      let arr = state.list.filter(ele => ele.checked == false)
      // console.log(arr)
      return arr.length==0 ? true : false
    }
  },
  mutations: {
    updateList(state, payload) {
      payload.map((ele,idx)=>{
        // 自定义了一个checked，用于控制Checkbox
        payload[idx].checked = true
      })
      state.list = payload
    },
    updateListItem(state, payload) {
      console.log('payload', payload)
      state.list[payload.index].checked = payload.check
    },
    updateListAll(state, payload) {
      state.list.map((ele,idx)=>{
        state.list[idx].checked = payload
      })
    }
  },
  actions: {
    getCartList(store, payload) {
      getCartList(payload).then(arr=>{
        store.commit('updateList', arr)
      })
    }
  }
}
