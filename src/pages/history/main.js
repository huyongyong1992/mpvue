import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    // navigationBarBackgroundColor: '#3f86ff',
    navigationBarTitleText: '历史上的今天'
  }
}