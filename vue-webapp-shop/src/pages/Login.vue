<template lang="html">
<div class="login">
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
</div>
</template>

<script>
import {
  Form,
  Field,
  Button
} from 'vant'
export default {
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data: function() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      // 提交注册
      let data = {
        username: this.username,
        password: this.password
      }
      this.$http.login(data).then(res=>{
        console.log('登录成功', res)
        localStorage.setItem('token', res.token)
        this.$router.replace('/home')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {

}
</style>
