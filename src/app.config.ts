
function getPath(path: string) {
  return `${process.env.TARO_ENV === 'h5' ? '..' : ''}/public/${path}`
}

export default defineAppConfig({
  pages: [
    'pages/Home/index',
    'pages/Task/index',
    'pages/Design/index',
    'pages/DesignEdit/index',
    'pages/AwardList/index',
    'pages/Score/index',
  ],
  // 全局的默认窗口表现
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    color: '',
    selectedColor: '',
    backgroundColor: '',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/Task/index',
        text: '任务',
        iconPath: getPath('task-icon.png'),
        selectedIconPath: getPath('task-icon.png'),
      },
      {
        pagePath: 'pages/Design/index',
        text: '目标',
        iconPath: getPath('task-icon.png'),
        selectedIconPath: getPath('task-icon.png'),
      },
      {
        pagePath: 'pages/AwardList/index',
        text: '星愿池',
        iconPath: getPath('award-icon.png'),
        selectedIconPath: getPath('award-icon.png'),
      },
    ],
  },
});
