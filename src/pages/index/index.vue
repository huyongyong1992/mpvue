<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div>{{userInfo.gender == 1 ? '男' :'女' }}</div>
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <span>{{userInfo.country}} · {{userInfo.province}} · {{userInfo.city}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: '中国 · 浙江 · 杭州',
      userInfo: {},
      encryptedData:'',
      iv:''
    }
  },

  components: {
    card
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  },
  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      const that = this;
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
      // wx.getWeRunData({
      //   success:function(res) {
      //     console.log(res)
      //     that.iv = res.iv;
      //     that.encryptedData = res.encryptedData;
      //   }
      // })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
