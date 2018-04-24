<template>
  <div class="history">
    <div class="history_list" v-for="(item,index) in resultList" :key="index">
      <span style="font-size:16px;color:#f00;">{{item.year}}:</span><span style="font-size:14px;">{{item.title}}</span>
    </div>
    
  </div>
</template>

<script>

export default {
  data () {
    return {
      resultList:[]
    }
  },
  mounted() {
    this.getDataList();
  },
  methods: { 
    getDataList () {  
      const that = this;
      wx.request({
        url: 'https://www.ipip5.com/today/api.php?type=json',
        data: {
        },
        method: 'GET',
        success: function (res) {
            that.resultList =  res.data.result;
        }
      })
     
    },
    
  }
}
</script>

<style scoped>
  .history {
    width:90%;
    padding:0 5%;
  }
  .history_list{
    padding:10px;
    box-shadow: 2px 5px 3px #888888;
    margin:5px 0;
  }
  

</style>
