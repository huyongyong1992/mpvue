import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', 
      '^pages/index/main', 
      'pages/about/main',
      'pages/counter/main', 
      'pages/weather/main',
      'pages/tools/main', 
      'pages/system/main',
      'pages/phone/main',
      'pages/idcard/main',
      'pages/bankcard/main',
      'pages/bmi/main',
      'pages/kuaidi/main',
      'pages/article/main',
      'pages/history/main',
      'pages/dream/main',
      'pages/huilv/main',
      'pages/wifi/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#373a41',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: '#fff'
    },
    'tabBar': {
      'color': '#969696',
      'selectedColor': '#09bb07',
      'borderStyle': '#969696',
      'backgroundColor': '#fcfcfc',
      'list': [
        {
          'pagePath': 'pages/tools/main',
          'iconPath': 'images/tools.png',
          'selectedIconPath': 'images/toolsHL.png',
          'text': '工具箱'
        },
        {
          'pagePath': 'pages/index/main',
          'iconPath': 'images/home.png',
          'selectedIconPath': 'images/homeHL.png',
          'text': '首页'
        },
        {
          'pagePath': 'pages/logs/main',
          'iconPath': 'images/log.png',
          'selectedIconPath': 'images/logHL.png',
          'text': '系统日志'
        },
        {
          'pagePath': 'pages/about/main',
          'iconPath': 'images/location.png',
          'selectedIconPath': 'images/locationHL.png',
          'text': '位置'
        }
      ]
    }
  }
}
