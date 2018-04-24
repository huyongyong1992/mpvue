<template>
  <div class="system">
    <div>{{sysInfo.model? '手机型号:'+sysInfo.model :''}}</div>
    <div>{{sysInfo.pixelRatio? '设备像素比:'+ sysInfo.pixelRatio :''}}</div>
    <div>{{sysInfo.screenWidth? '屏幕宽度:'+ sysInfo.screenWidth :''}}</div>
    <div>{{sysInfo.screenHeight? '屏幕高度:'+ sysInfo.screenHeight :''}}</div>
    <div>{{sysInfo.windowWidth? '可用窗口宽度:'+ sysInfo.windowWidth :''}}</div>
    <div>{{sysInfo.windowHeight? '可用窗口高度:'+ sysInfo.windowHeight :''}}</div>
    <div>{{sysInfo.version? '微信版本号：'+ sysInfo.version :''}}</div>
    <div>{{sysInfo.system? '操作系统版本：'+ sysInfo.system :''}}</div>
    <div>{{sysInfo.platform? '客户端平台：'+ sysInfo.platform :''}}</div>
    <div>{{sysInfo.SDKVersion? '客户端基础库版本：'+ sysInfo.SDKVersion :''}}</div> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      sysInfo:{}
    }
  },

  mounted() {
    const that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.sysInfo = res;
      }
    })
  },

  methods: {
    
  }
}
</script>

<style scoped>
  .system{
    width:92%;
    padding:30px 4% 0;
    font-size:16px;
    line-height:28px;
  }
</style>
