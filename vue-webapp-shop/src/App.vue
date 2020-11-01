<template>
  <div class="app">

    <router-view></router-view>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  mounted() {
    // websocket初始化
    this.getCartList({})
  },
  methods: {
    ...mapActions('cart', ['getCartList'])
  }
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
  position: relative;
}
.tabs {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  height: 80px;
  display: flex;
}
.tabs span {
  flex: 1;
  text-align: center;
  border: 1px solid #ccc;
  line-height: 80px;
}
.tabs span.on {
  color: red;
}

</style>
