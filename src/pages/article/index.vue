<template>
  <div class="article">
    <div class="header">
      <button @click="getInfo" type="primary">换一篇</button>
    </div>
    
    <div class="article_desc">
      <p style="text-align:center;font-size:20px;font-weight:bold">{{result.title}}</p>
      <p style="text-align:center;font-size:14px;">{{result.author}}</p>
      <rich-text  :nodes="result.content" class="article_content">  </rich-text>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      result:{},
      city:'',
      day:'random'
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: { 
    getInfo () {  
      const that = this
      wx.request({  
        url: 'https://interface.meiriyiwen.com/article/'+that.day,
        data: {
          dev:1
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          that.result = res.data.data;
           
        },
  
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
  
  input {
    border-bottom:1px solid #ccc;    
    text-align:center;
    padding:5px 0;
  }
  .article button{
    margin-top:10px;
    width:40%;
    margin-left:30%;
  }
  .article_desc {
    margin-top:20px;
    width:92%;
    padding:0 4%;
  }
  .article_content{
    font-size:18px;
    text-indent:32px;
  }

</style>
