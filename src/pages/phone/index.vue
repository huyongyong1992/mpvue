<template>
  <div class="phone">
    <div class="header">
      <input v-model="phone"  placeholder="请输入手机号" type="number" maxlength="11">
      <button @click="onSearch" type="primary" :loading="loading">查询</button>
    </div>
    
    <div class="phone_detail" v-if="isShow">
      <p>归属地：{{phoneData.province}}{{phoneData.city? '-'+phoneData.city : ''}}</p>
      <p>运营商：{{phoneData.company}}{{phoneData.cardtype}}</p>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      phoneData:{},
      phone:'',
      isShow:false,
      loading:false
    }
  },
  methods: { 
    onSearch () {  
      if(this.phone.length !== 11) {
        wx.showToast({
          title: '请输入手机号',
          icon:'none'
        })
        return ;
      }
      let that = this;
      that.loading = true;
      wx.request({
        url: 'https://way.jd.com/jisuapi/query4',
        data: {
          shouji: this.phone,
          appkey: 'd1cdc0369dc2bea0532a2403593882ef'
        },
        method: 'GET',
        success: function (res) {
          that.phoneData = res.data.result.result;
          that.isShow = true;
          that.loading = false;          
        }
      })
    },
    
  }
}
</script>

<style scoped>
  .phone {
    width:92%;
    padding:0 4%;
    margin-top:40px;
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
  .phone_detail{
    margin-top:20px;
  }
  .phone_detail p {
    padding-left:30%;
  }
</style>
