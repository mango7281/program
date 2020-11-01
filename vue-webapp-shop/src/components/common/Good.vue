<template lang="html">
<div class="good">
  <div class="box">
    <img :src="img.baseUrl+good.img" @touchstart='skipToDetail'>
  </div>
</div>
</template>

<script>
import img from '@/utils/img'
export default {
  data: function() {
    return {
      img
    }
  },
  props: {
    good: {
      type: Object,
      required: true
    }
  },
  methods: {
    skipToDetail() {
      this.$router.push('/detail/'+this.good._id)
    }
  }
}
</script>

<style lang="scss" scoped>
.good {
  display: inline-block;
  width: 5rem;
  height: 5rem;
  border: 1px solid orange;
  box-sizing: border-box;
  .box {
    &>img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
