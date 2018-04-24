<template>
  <div class="bmi">
    <div class="header">
      <div class="bmi_label">
        <div>体重：</div><input v-model="weight"  placeholder="体重" type="number"><span>kg</span>
      </div>
      <div class="bmi_label">
        <div>身高：</div><input v-model="height"  placeholder="身高" type="number">cm
      </div>
      <button @click="onSearch" type="primary">测算</button>
    </div>
    
    <div class="bmi_result" v-if="result">
      <p class="normal">{{result.text}}</p>
      <p class="warn">{{result.notice}}</p>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      result:'',
      weight:'',
      height:'',
      resList:{
        thin:{
          text:'体重过轻',
          warn:true,
          notice:''
        },
        normal:{
          text:'正常范围',
          warn:false,
          notice:''
        },
        weight:{
          text:'体重偏重',
          warn:true,
          notice:'超重和肥胖是冠心病和脑卒中发病的独立危险因素。体重指数每增加2，冠心病、脑卒中、缺血性脑卒中的相对危险分别增加15.4%、6.1%和18.8%。 一旦体重指数达到或超过24时，患高血压、糖尿病、冠心病和血脂异常等严重危害健康的疾病的概率会显著增加'
        },
        fat:{
          text:'肥胖',
          warn:true,
          notice:'超重和肥胖是冠心病和脑卒中发病的独立危险因素。体重指数每增加2，冠心病、脑卒中、缺血性脑卒中的相对危险分别增加15.4%、6.1%和18.8%。 一旦体重指数达到或超过24时，患高血压、糖尿病、冠心病和血脂异常等严重危害健康的疾病的概率会显著增加'
        },
        tooFat:{
          text:'非常肥胖',
          warn:true,
          notice:'超重和肥胖是冠心病和脑卒中发病的独立危险因素。体重指数每增加2，冠心病、脑卒中、缺血性脑卒中的相对危险分别增加15.4%、6.1%和18.8%。 一旦体重指数达到或超过24时，患高血压、糖尿病、冠心病和血脂异常等严重危害健康的疾病的概率会显著增加'
        }
      }
    }
  },
  methods: { 
    onSearch () {  
      if(!this.height || !this.weight) {
        wx.showToast({
          title: '请输入身高和体重信息',
          icon:'none'
        })
        return ;
      }
      let height = parseInt(this.height)/100;
      let weight = parseInt(this.weight);
      let bmi;
      // bmi 公式
      bmi = weight/(height*height);
      
      if(bmi<18.5) {
        this.result = this.resList.thin;
      } else if (bmi>=18.5 && bmi <=23.9){
        this.result = this.resList.normal;
      } else if (bmi >= 23.9 && bmi <= 27.9) {
        this.result = this.resList.weight
      } else if (bmi > 27.9 && bmi <= 32) {
        this.result =  this.resList.fat
      }else{
        this.result = this.resList.tooFat
      }
     
    },
    
  }
}
</script>

<style scoped>
  .weather {
    width:92%;
    padding:0 4%;
  }
  .header{
    width:60%;
    margin-left:20%;
  }
  .bmi_label{
    display:flex;
    align-items: center;
    margin-top:20px;
  }
  .bmi_label div{
    width:85px;
    display: block;
  }
  input {
    border-bottom:1px solid #ccc;    
    text-align:center;
    padding:5px 0;
  }
  .bmi button{
    margin-top:20px;
  }
  .bmi_result p{
    text-align:center;
  }
  .bmi .normal {
    /* color:#09bb07; */
    margin-top:20px;
  }
  /* .bmi .active {
    color:#f00;
  } */
  .bmi .warn{
    padding: 0 10%;
    font-size:14px;
    color:#f00;
    margin-top:20px;
  }

</style>
