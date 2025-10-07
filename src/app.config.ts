export default defineAppConfig({
  pages: [
    'pages/Home/index',
    'pages/Task/index',
    'pages/AwardList/index',
    'pages/Score/index'
  ],
  // 全局的默认窗口表现
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '',
    selectedColor: '',
    backgroundColor: '',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/Task/index',
        text: '目标',
        iconPath: '../public/task-icon.png',
        selectedIconPath: '../public/task-icon.png',
      },
      {
        pagePath: 'pages/AwardList/index',
        text: '星愿池',
        iconPath: '../public/award-icon.png',
        selectedIconPath: '../public/award-icon.png',
      }
    ]
  }
})
