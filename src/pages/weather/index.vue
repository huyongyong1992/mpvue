<template>
  <div class="weather">
    <div class="header">
      <input v-model="city"  placeholder="请输入城市名">
      <button @click="onSearch" type="primary" :loading="loading">查询</button>
    </div>
    
    <!-- tab -->
    <div class="weather_detail" v-if="isShow">
      <div class="weather_tab">
        <span style="border-right:1px solid #fcfcfc" :class="[index == 0 ? 'active' : '']" @click="onTabChange(0)">实时天气</span>
        <span style="border-right:1px solid #fcfcfc" :class="[index == 1 ? 'active' : '']" @click="onTabChange(1)">生活指数</span>
        <span :class="[index == 2 ? 'active' : '']" @click="onTabChange(2)">未来天气</span>
      </div>

      <!-- 每个tab下的内容 -->
      <div v-if="index == 0" class="weather_now">
        <p>
          <span>AQI指数：</span><span>{{result.aqi.city.aqi}}</span>
        </p>
        <p>一氧化碳：{{result.aqi.city.co}}</p>
        <p>二氧化氮：{{result.aqi.city.no2}}</p>
        <p>臭氧：{{result.aqi.city.o3}}</p>
        <p>PM10：{{result.aqi.city.pm10}}</p>
        <p>PM2.5：{{result.aqi.city.pm25}}</p>
        <p>二氧化硫：{{result.aqi.city.so2}}</p>
        <p>空气质量：{{result.aqi.city.qlty}}</p>
        <p>感冒指数：{{result.now.fl}}</p>
        <p>相对湿度：{{result.now.hum}}%</p>
        <p>温度：{{result.now.tmp}}℃</p>
        <p>能见度：{{result.now.vis}}</p>
        <p>大气压：{{result.now.pres}}</p>
        <p>降水量：{{result.now.pcpn}}</p>
        <p>风向：{{result.now.wind.deg}}({{result.now.wind.dir}})</p>
        <p>风力等级：{{result.now.wind.sc}}</p>
        <p>风速：{{result.now.wind.spd}}</p>
        <p>天气状况：{{result.now.cond.txt}}</p>
      </div>

      <div v-if="index == 1" class="weather_life">
        <p v-for="(item,index) in result.suggestion" :key="index">
          <span style="color:#f00;font-size:36rpx;margin-right:20rpx;">{{item.brf}}:</span>
          <span style="font-size:26rpx;">{{item.txt}}</span>
        </p>
      </div>

      <scroll-view scroll-x>
      <view v-if="index == 2" class="weather_future">
      
        <view v-for="(item,index) in result.daily_forecast" :key="index" class="fw_item">
          <view style="color:#f00;">{{item.date}}</view>
          <view>{{item.tmp.min}}~{{item.tmp.max}}℃</view>
          <view>{{item.cond.txt_d}}/{{item.cond.txt_n}}</view>
          <view>湿度：{{item.hum}}%</view>
          <view>降水概率：{{item.pop}}</view>
          <view>紫外线指数：{{item.uv}}</view>
          <!-- <view>降水量：{{item.pcpn}}</view> -->
          <!-- <view>大气压：{{item.pres}}</view> -->
          <view>能见度：{{item.vis}}</view>
          <view>{{item.wind.dir}}/{{item.wind.sc}}级</view>
          <!-- <view>风速：{{item.wind.spd}}</view> -->
        </view>
      
      </view>
    </scroll-view>


    </div>

    
  </div>
</template>

<script>

export default {
  data () {
    return {
      result:{},
      city:'',
      index:0,
      loading:false,
      isShow:false
    }
  },
  mounted() {
    // this.onSearch()
  },
  methods: { 
    onTabChange(index) {
      this.index = index;
    },
    onSearch () {  
      const that = this;
      that.loading = true;
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
          if( res.data.result.HeWeather5[0].status  === "unknown city") {
            wx.showToast({
              title: '未知城市',
              icon:'none'
            })
            return ;
          }
          that.loading = false;
          that.isShow = true;
          that.result = res.data.result.HeWeather5[0];
        }
  
      })
    },
    
  }
}
</script>

<style scoped>
  .weather {
    width:92%;
    padding:20px 4% 0;
  }
  .header{
    width:50%;
    margin-left:25%;
  }
  input {
    border-bottom:1px solid #ccc;    
    text-align:center;
    padding:5px 0;
  }
  button{
    margin-top:10px;
  }
  .weather_tab{
    width:80%;
    margin:20px 10% 10px;
    border:1px solid  #09bb07;
    box-shadow:inset 0 0 10px #09bb07;
    height:40px;
    display: flex;
  }
  .weather_tab span{
    display: block;
    width:33.3%;
    height:40px;
    line-height:40px;
    text-align: center;
    background-color: #09bb07;
    box-shadow:inset 0 0 10px #09bb07;
    color:#666;

  }
  .weather_tab .active{
    background-color: #fcfcfc;
  }
  .weather_now p {
    padding-left:20%;
  }
  .weather_life {
    width:80%;
    margin:10px 10%;
  }
  .weather_life p {
    box-shadow: 0 0 10px #09bb07;
    margin-top:15px;
    padding:5px 10px;
  }
  .weather_future{
    display: flex;
    overflow: auto;
    width: 250%;
    font-size:14px;
  }
  
.fw_item{
  width:14%;
  line-height:24px;
  margin-right:5px;
  margin-left:5px;
  text-align:center;
  box-shadow: 0 0 10px #09bb07;
}
</style>
