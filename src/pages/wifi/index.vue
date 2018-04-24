<template>
  <div class="wifi">
    <div class="wifi_container">
      获取小程序二维码
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      user:'',
      
    }
  },
  mounted() {
    wx.request({
      url:'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxbb6142ec438e4bd7&secret=2b732ac106fe0de71664930a519a709e',
      method: 'GET',
      success:function(res) {
        console.log(res)
      }
    })
    
  },
  methods: {
    
  }
}
</script>

<style scoped>
  
</style>
