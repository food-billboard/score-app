import Taro from '@tarojs/taro'
import request from './request'

const TOKEN = 'TOKEN'

export const getToken = (returnHeaders: boolean=false) => {
  const { token } = Taro.getStorageSync(TOKEN) || {}
  if(!token) return false
  if(!returnHeaders) return token
  return {
    Authorization: `Basic ${token}`
  }
}

export const setToken = (token: string) => {
  Taro.setStorageSync(TOKEN, { token })
}

export const clearToken = () => Taro.setStorageSync(TOKEN, {})

export const createUserAuth = ({ mobile, password }) => {
  return {
    Authorization: `Basic ${btoa(encodeURI(`${mobile}:${password}`))}`
  }
}

const TARO_APP_MOCK_LOGON_MAP: any = {
  "process.env.TARO_APP_DEFAULT_FATHER_ID": {
    mobile: process.env.TARO_APP_MOCK_FATHER_MOBILE,
    password: process.env.TARO_APP_MOCK_FATHER_PASSWORD,
    email: process.env.TARO_APP_MOCK_FATHER_EMAIL
  },
  "process.env.TARO_APP_DEFAULT_MATHER_ID": {
    mobile: process.env.TARO_APP_MOCK_MOTHER_MOBILE,
    password: process.env.TARO_APP_MOCK_MOTHER_PASSWORD,
    email: process.env.TARO_APP_MOCK_MOTHER_EMAIL
  },
  "process.env.TARO_APP_DEFAULT_GRANDPA_ID": {
    mobile: process.env.TARO_APP_MOCK_GRANDPA_MOBILE,
    password: process.env.TARO_APP_MOCK_GRANDPA_PASSWORD,
    email: process.env.TARO_APP_MOCK_GRANDPA_EMAIL
  },
  "process.env.TARO_APP_DEFAULT_GRANDMA_ID": {
    mobile: process.env.TARO_APP_MOCK_GRANDMA_MOBILE,
    password: process.env.TARO_APP_MOCK_GRANDMA_PASSWORD,
    email: process.env.TARO_APP_MOCK_GRANDMA_EMAIL
  },
  "process.env.TARO_APP_DEFAULT_CHILD_ID": {
    mobile: process.env.TARO_APP_MOCK_CHILD_MOBILE,
    password: process.env.TARO_APP_MOCK_CHILD_PASSWORD,
    email: process.env.TARO_APP_MOCK_CHILD_EMAIL
  },
}

export default async function(user: string) {
  return request<any>('/api/user/logon/account', {
    method: 'POST',
    data: { 
      env: process.env.NODE_ENV === 'development' ? 'dev' : 'prod',
      ...TARO_APP_MOCK_LOGON_MAP[user] || TARO_APP_MOCK_LOGON_MAP['process.env.TARO_APP_DEFAULT_FATHER_ID'],
    },
    mis: false,
  })
  .then(data => {
    setToken(data.token)
    return data 
  });
}