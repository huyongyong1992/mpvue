<template>
  <div class="tools">
    <div class="tools_container">
      <div class="item" v-for="(item,index) in list" :key="index" @click="onNavigate(item.redirect)">
        <img :src="item.imgUrl">
        <p>{{item.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      user:'',
      list:[{
        imgUrl:require('../../images/system.png'),
        text:'系统信息',
        redirect:'system'
      },{
        imgUrl:require('../../images/phone.png'),
        text:'手机归属地',
        redirect:'phone'
      },{
        imgUrl:require('../../images/weathers.png'),
        text:'天气预报',
        redirect:'weather'
      },{
        imgUrl:require('../../images/idcard.png'),
        text:'身份证查询',
        redirect:'idcard'
      },{
        imgUrl:require('../../images/bankcard.png'),
        text:'银行卡查询',
        redirect:'bankcard'
      },{
        imgUrl:require('../../images/article.png'),
        text:'每日一文',
        redirect:'article'
      },{
        imgUrl:require('../../images/bmi.png'),
        text:'BMI指数',
        redirect:'bmi'
      },{
        imgUrl:require('../../images/history.png'),
        text:'历史上的今天',
        redirect:'history'
      },{
        imgUrl:require('../../images/kuaidi.png'),
        text:'快递查询',
        redirect:'kuaidi'
      },{
        imgUrl:require('../../images/money.png'),
        text:'汇率换算',
        redirect:'huilv'
      },{
        imgUrl:require('../../images/dream.png'),
        text:'周公解梦',
        redirect:'dream'
      },{
        imgUrl:require('../../images/wifi.png'),
        text:'wifi',
        redirect:'wifi'
      }]
    }
  },

  methods: {
    onNavigate(redirect) {
      const url = '../'+ redirect + '/main';
      wx.navigateTo({ url })
    }
  },


  created () {
  }
}
</script>

<style scoped>
  .tools_container{
    width:100%;
    display: flex;
    flex-wrap:wrap;
  }
  .item{
    width:33.3%;
    height:100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size:14px;
  }
  .item img{
    width:50px;
    height:50px;
  }
</style>
