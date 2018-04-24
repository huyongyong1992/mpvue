<template>
  <div class="weather">
    <div class="header">
     
    </div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      weather:{},
      latitude:'',
    }
  },
  
  mounted() {
    const that = this; 
    // 新建百度地图对象 
    wx.getLocation({
      success:function(res) {
        console.log(res)
        that.latitude = res.latitude;
        that.longitude = res.longitude;
        wx.openLocation({
          latitude:that.latitude,
          longitude:that.longitude,
          scale:28,
          success:function(e) {
            console.log(e)
          }
        })
      }
    })
  },
  methods: { 
    onSearch () {  
      const that = this;
      if(!that.city) {
        wx.showToast({
          title: '请输入城市',
          icon:'none'
        })
        return ;
      }
      wx.request({
        url: 'https://way.jd.com/he/freeweather',
        data: {
          city: that.city,
          appkey: 'd1cdc0369dc2bea0532a2403593882ef'
        },
        method: 'GET',
        success: function (res) {
          that.weather = res.data.result.HeWeather5[0];
        }
  
      })
    },
    
  }
}
</script>

<style scoped>
  .weather {
    width:92%;
    padding:0 4%;
  }
  .header{
    width:44%;
    margin-left:30%;
  }
  input {
    border-bottom:1px solid #ccc;    
    text-align:center;
    padding:5px 0;
  }
  button{
    margin-top:10px;
  }

</style>
