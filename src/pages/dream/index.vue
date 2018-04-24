<template>
  <div class="dream">
    <div class="header">
      <input v-model="keyword"  placeholder="请输入关键词">
      <button @click="onSearch" type="primary" :loading="loading">查询</button>
    </div>
    
    <div class="dream_detail" v-if="isShow">
      <view v-for="(item,index) in result" :key="index" class="dream_content">
        <rich-text :nodes="item.content"></rich-text>
      </view>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      result:[],
      keyword:'',
      loading:false,
      isShow:false,
      repeatClick:false
    }
  },
  methods: { 
    onSearch () {  
      const that = this;
      if(!that.keyword) {
        wx.showToast({
          title: '请输入关键词',
          icon:'none'
        })
        return ;
      }
      /** 防频繁 点击，收费API */
      if (that.repeatClick) {
        wx.showToast({
          title: '您的操作太频繁了，休息一下下吧~ ~',
          icon: 'none'
        })
        return;
      }
      that.loading = true;
      that.repeatClick = true;
      setTimeout(function() {
        that.repeatClick = false;
      },10000)
      
      wx.request({
      url: 'https://api.apishop.net/common/dream/searchDreamDetail',
      data: {
        keyword: that.keyword,
        apiKey:'pwzqUrYf5fe8eb9540a1ff0f1d9cf060ce0a2010225082e'
      },
      method: 'GET',
      success: function (res) {
        that.result = res.data.result;
        that.loading = false;
        that.isShow = true;
      }
    })

    },
    
  }
}
</script>

<style scoped>
  .dream {
    width:92%;
    padding:20px 4% 0;
    
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
  .dream_detail{
    font-size:16px;
    margin-top:20px;
    text-indent: 32px;
  }
</style>
