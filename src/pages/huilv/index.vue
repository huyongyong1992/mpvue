<template>
  <div class="huilv">
     <div class="huilv_item">
      <input placeholder="请输入货币数量" v-model="fValue" type="number" />
      <picker @change="fChange" :value="findex" :range="dataList" range-key="name">
        <view class="picker">
          <text class="money_type">{{dataList[findex].name}}(更换)</text>
        </view>
      </picker>
    </div>
    <view class="huilv_item">
      <input placeholder="请输入货币数量" v-model="tValue" type="number" />
      <picker @change="tChange" :value="tindex" :range="dataList" range-key="name">
        <view class="picker">
          <text class="money_type">{{dataList[tindex].name}}(更换)</text>
        </view>
      </picker>
    </view>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
      f:'USD',   //起始货币
      t:'CNY',   //目标货币
      fValue:'',  //起始货币数值
      tValue:'',  //目标货币数值
      rate:'',
      findex:1,
      tindex:0,
      dataList: [
        {
          id: 'USD',
          name: '美元'
        },
        {
          id: 'CNY',
          name: '人民币'
        },
        {
          id: 'EUR',
          name: '欧元'
        },
        {
          id: 'GBP',
          name: '英镑'
        },
        {
          id: 'HKD',
          name: '港币'
        },
        {
          id: 'TWD',
          name: '新台币'
        },
        {
          id: 'MOP',
          name: '澳门元'
        },
        {
          id: 'RUB',
          name: '卢布'
        },
        {
          id: 'MYR',
          name: '林吉特'
        },
        {
          id: 'AUD',
          name: '澳元'
        },
        {
          id: 'CAD',
          name: '加元'
        },
        {
          id: 'JPY',
          name: '日元'
        },
        {
          id: 'KRW',
          name: '韩元'
        },
        {
          id: 'THB',
          name: '泰铢'
        },
        {
          id: 'CHF',
          name: '瑞士法郎'
        },
        {
          id: 'SGD',
          name: '新加坡元'
        },
        {
          id: 'NZD',
          name: '新西兰元'
        }
      ],
    }
  },
  mounted() {
    this.getRate();
  },
  watch: {
    fValue(newVal) {
      this.tValue = (newVal * this.rate);
    },
    tValue(newVal) {
      this.fValue = (newVal / this.rate);
    }
  },
  methods: { 
    getRate() {
      const that = this;
      wx.request({
        url: 'https://www.zhaotool.com/v1/api/huobi/e10adc3949ba59abbe56e057f20f883e/' + that.f + '/' + that.t,
        data: {
        },
        method: 'GET',
        success: function (res) {
          if(res.data.code != '0') {
            wx.showToast({
              title: res.data.msg,
            })
            return;
          }
          that.rate = res.data.data.rate
          
        }
      })
    },
    tChange(e) {
      this.t = this.dataList[e.mp.detail.value].id;
      this.tindex = e.mp.detail.value;
      this.getRate();
    },
    fChange(e) {
      this.f = this.dataList[e.mp.detail.value].id;
      this.findex = e.mp.detail.value;
      this.getRate();
    },
    fmoneyChange(e) {
      console.log(e);
    }
    
  }
}
</script>

<style scoped>
  .huilv {
    width:92%;
    padding:0 4%;
  }
  .huilv_item{
    display: flex;
    align-items: center;
    margin:10px 0;
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
  

</style>
