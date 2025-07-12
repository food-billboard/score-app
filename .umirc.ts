import { defineConfig } from 'umi';
import 'dotenv/config'

// const API_DOMAIN = `http://${process.env.RASPBERRY_IP}`;
const API_DOMAIN = 'http://localhost:4000';

export default defineConfig({
  hash: true,
  history: {
    type: 'hash',
  },
  ...(process.env.REACT_APP_ENV === 'prod' ? {
    // base: '/api/backend/eat-what/',
    base: '/',
    publicPath: '/api/backend/score/',
  } : {}),
  define: {
    'process.env.REACT_APP_ENV': process.env.REACT_APP_ENV,
    'process.env.REQUEST_API': process.env.REQUEST_API,
    'process.env.MOCK_USER_MOBILE': process.env.MOCK_USER_MOBILE,
    'process.env.MOCK_USER_PASSWORD': process.env.MOCK_USER_PASSWORD,
    'process.env.MOCK_USER_EMAIL': process.env.MOCK_USER_EMAIL,
    'process.env.DEFAULT_FATHER_ID': process.env.DEFAULT_FATHER_ID,
    'process.env.DEFAULT_MATHER_ID': process.env.DEFAULT_MATHER_ID,
    'process.env.DEFAULT_GRANDPA_ID': process.env.DEFAULT_GRANDPA_ID,
    'process.env.DEFAULT_GRANDMA_ID': process.env.DEFAULT_GRANDMA_ID,
    'process.env.API_DOMAIN': API_DOMAIN
  },
  routes: [
    { path: '/', component: '@/pages/Home/index' },
    { path: '/task', component: '@/pages/Task/index' },
    { path: '/score', component: '@/pages/Score/index' },
    { path: '/award', component: '@/pages/AwardList/index' },
  ],
  npmClient: 'yarn',
  scripts: [
    `
    (function (designWidth, base) {
      var resize = function () {
        document.documentElement.style.fontSize = (window.innerWidth / designWidth) * base + 'px'
      }
      resize()
      window.addEventListener('resize', resize)
    })(375, 10)
    `,
  ],
  proxy: process.env.REACT_APP_ENV === 'dev' ? {
    '/api/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  } : {
    '/api/': {
      target: API_DOMAIN,
      changeOrigin: true,
      pathRewrite: { '^/api/static': '/static' },
    },
  }
});
