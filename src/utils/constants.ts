import { EventEmitter } from 'eventemitter3'
import { getUserInfo as getUserInfoData } from '../services/base'

export const Event = new EventEmitter()

export const AWARD_CYCLE_ENUM = {
  NONE: '无限制',
  WEEK: '周',
  DAY: '天',
  MONTH: '月',
  YEAR: '年',
  QUARTER: '季度'
}

let USER_INFO: {
  _id: string
  username: string 
  score: number 
  avatar: string
  __user__: string 
} = {
  _id: '',
  username: '',
  avatar: '',
  score: 0,
  __user__: ''
}

export async function fetchUserInfo(update=false) {
  return getUserInfoData()
  .then(data => {
    setUserInfo(data, update)
  })
}

export function getUserInfo() {
  return USER_INFO
}

export function setUserInfo(value: any, update=false) {
  USER_INFO = {
    ...USER_INFO,
    ...value
  }
  if(update) {
    Event.emit('update')
  }
}