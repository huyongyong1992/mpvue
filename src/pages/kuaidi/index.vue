<template>
  <div class="kuaidi">
    <div class="header">
      <input v-model="kuaidiNo"  placeholder="请输入快递单号" type="number">
      <picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
        <view class="picker">
          请选择快递类型：{{array[index].name }}
        </view>
      </picker>
      <button @click="onSearch" type="primary">查询</button>
    </div>
    
    <div class="kuaidi_detail">
      <p v-if="isShow" style="font-size:20px;margin-top:30px;padding-bottom:20px;text-align:center;">查询结果</p>
      <div class="kuaidi_desc">
        <div v-for="(item,index) in result" :key="index" class="kuaidi_item">
          <p class="kuaidi_desc" style="color:#333;">{{item.context}}</p>
          <p class="kuaidi_time" style="color:#666;">{{item.time}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      result:[],
      kuaidiNo:'',
      isShow:false,
      kuaidiType:'',
      index:0,
      array:[{
        name:'韵达快递',
        id:'yunda'
      },{
        name:'圆通速递',
        id: 'yuantong'
      }, {
        name: '中通快递',
        id: 'zhongtong'
      }, {
        name: '中国邮政',
        id: 'youzhengguonei'
      }, {
        name: '亚马逊物流',
        id: 'yamaxunwuliu'
      }, {
        name: '百世快递',
        id: 'huitongkuaidi'
      }, {
        name: '德邦物流',
        id: 'debangwuliu'
      }, {
        name: 'EMS快递',
        id: 'ems'
      }, {
        name: '凡客如风达',
        id: 'rufengda'
      }, {
        name: '京东快递',
        id: 'jd'
      }, {
        name: '申通',
        id: 'shentong'
      }, {
        name: '苏宁快递',
        id: 'suning'
      }, {
        name: '天天快递',
        id: 'tiantian'
      }, {
        name: '顺丰',
        id: 'shunfeng'
      }, {
        name: '宅急送',
        id: 'zhaijisong'
      }, {
          name: '中铁快运',
          id: 'ztky'
      }]
    }
  },
  methods: { 
    onSearch () {  
      if(!this.kuaidiNo) {
        wx.showToast({
          title: '请输入快递单号',
          icon:'none'
        })
        return ;
      }
      const that = this;
      wx.request({
        url: 'https://www.kuaidi100.com/query' ,
        data: {
          type: that.kuaidiType,
          postid: that.kuaidiNo
        },
        method: 'GET',
        success: function (res) {
          if(res.data.message !== 'ok') {
            wx.showToast({
              title: res.data.message,
              icon:'none'
            })
            return ;
          }
          that.result = res.data.data;
          that.loading = false;
          that.isShow = true;
        }
      })
    },
    bindPickerChange(e) {
      // console.log(e);
      this.kuaidiType = this.array[e.mp.detail.value].id,
      this.index = e.mp.detail.value
    }
  }
}
</script>

<style scoped>
  .kuaidi {
    width:92%;
    padding:20px 4% 0;
  }
  .header{
    width:70%;
    margin-left:15%;
  }
  .kuaidi input {
    border-bottom:1px solid #ccc;    
    text-align:center;
    padding:5px 0;
  }
  .kuaidi button{
    width:44%;
    margin:0 28%;
  }
  .kuaidi_desc{
    font-size:14px;
    width:100%;
  }
  .kuaidi_item{
    width:80%;
    margin:0 10%;
    padding:10px;
    /* box-shadow: 2px -3px 3px #999; */
    box-shadow:inset 0 0 10px #0CC;
    border-radius: 10px;
    margin-bottom:6px;
  }
.kuaidi .picker{
  margin:15px 0;
}
</style>
