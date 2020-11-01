export default {
  namespaced: true,
  state: {
    cateObj: {}
  },
  mutations: {
    updateCateObj(state,payload) {
      state.cateObj[payload.idx] = payload.val
    }
  }
}
