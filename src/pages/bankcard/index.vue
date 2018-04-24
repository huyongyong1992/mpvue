<template>
  <div class="bankcard">
    <div class="header">
      <input v-model="bankcard"  placeholder="请输入卡号">
      <button @click="onSearch" type="primary" :loading="loading">查询</button>
    </div>
    
    <div v-if="isShow" class="bank_detail">
      <p>所属银行：{{cardInfo.bankName}}</p>
      <p>卡类型：{{cardInfo.cardType}}</p>
      <p>服务电话：{{cardInfo.bankMobile}}</p>
      <p style="display:flex;">银行logo：<img :src="cardInfo.logo" mode="widthFix" style="width:100px;"></p>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      loading:false,
      cardInfo:{},
      bankcard:'',
      isShow:false
    }
  },
  methods: { 
    onSearch () {  
      if(!this.bankcard) {
        wx.showToast({
          title: '请输入卡号',
          icon:'none'
        })
        return ;
      }
      let that = this;
      wx.request({
      url: 'https://www.zhaotool.com/v1/api/lt/e10adc3949ba59abbe56e057f20f883e/' + that.bankcard,
      data: {
      },
      method: 'GET',
      success: function (res) {
        if(res.data.code != '0') {
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
          that.loading = false;
          return ;
        }
        that.cardInfo = res.data.data;
        that.loading = false;
        that.isShow = true;
        
      },
  
      })
    },
    
  }
}
</script>

<style scoped>
  .bankcard {
    width:92%;
    padding:0 4%;
    padding-top:40px;
  }
  .header{
    width:60%;
    margin-left:20%;
  }
  input {
    border-bottom:1px solid #ccc;    
    text-align:center;
    padding:5px 0;
  }
  button{
    margin-top:10px;
  }
  .bank_detail{
    margin-left:15%;
    margin-top:40px;
  }

</style>
