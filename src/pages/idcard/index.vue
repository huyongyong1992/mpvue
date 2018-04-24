<template>
  <div class="idcard">
    <div class="header">
      <input v-model="idcard"  placeholder="请输入身份证号" type="idcard">
      <button @click="onSearch" type="primary" :loading="loading">查询</button>
    </div>
    
    <div class="idcard_detail" v-if="isShow">
      <p>性别：{{idcardInfo.sex}}</p>
      <p>出生日期：{{idcardInfo.birthday}}</p>
      <p>籍贯：{{idcardInfo.area}}</p>
      <p>星座：{{idcardInfo.constellation}}</p>
      <p>生肖：{{idcardInfo.zodiac}}</p>
      <p>农历年份：{{idcardInfo.cnEra}}</p>

      <p v-if="extra">姓名：{{extra.cnName }}</p>
      <p v-if="extra">手机：{{extra.mobile }}</p>
      <p v-if="extra">姓名：{{extra.email }}</p>
      <p v-if="extra">住址：{{extra.address }}</p>
    </div>

    <p class="bottom">本小程序不会保存任何人的查询数据,不是非法钓鱼，请不要同时查询您个人名下的手机号/身份证/银行卡三个信息</p>
  </div>
</template>

<script>

export default {
  data () {
    return {
      idcardInfo:{},
      extraInfo:{},
      idcard:'',
      isShow:false,
      loading:false,
    }
  },
  methods: { 
    onSearch () {  
      if(this.idcard.length != 18) {
        wx.showToast({
          title: '请输入身份证号',
          icon:'none'
        })
        return ;
      }
      const that = this;
      wx.request({
        url: 'https://www.zhaotool.com/v1/api/lt/e10adc3949ba59abbe56e057f20f883e/'+that.idcard,
        
        method: 'GET',
        success: function (res) {
          if(res.data.code != '0') {
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
            that.loading = false
            return ;
          }
          that.idcardInfo = res.data.data;
          that.extraInfo = res.data.etr || '';
          that.loading = false;
          that.isShow =true;
        },
      })
    }
  }
}
</script>

<style scoped>
  .idcard {
    width:92%;
    padding:0 4%;
    padding-top:40px;
  }
  .header{
    width:70%;
    margin-left:15%;
  }
  input {
    border-bottom:1px solid #ccc;    
    text-align:center;
    padding:5px 0;
  }
  button{
    margin-top:10px;
  }
  .idcard_detail{
    margin-top:40px;
    padding-left:15%;
  }
  .bottom{
    position: fixed;
    bottom:0;
    color:#f00;
    font-size:12px;
    padding:0 4%;
  }

</style>
