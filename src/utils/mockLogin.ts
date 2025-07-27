import request from './request'

const { 
  REACT_APP_ENV,
} = process.env;

const MOCK_LOGON_MAP: any = {
  "process.env.DEFAULT_FATHER_ID": {
    mobile: process.env.MOCK_FATHER_MOBILE,
    password: process.env.MOCK_FATHER_PASSWORD,
    email: process.env.MOCK_FATHER_EMAIL
  },
  "process.env.DEFAULT_MATHER_ID": {
    mobile: process.env.MOCK_MOTHER_MOBILE,
    password: process.env.MOCK_MOTHER_PASSWORD,
    email: process.env.MOCK_MOTHER_EMAIL
  },
  "process.env.DEFAULT_GRANDPA_ID": {
    mobile: process.env.MOCK_GRANDPA_MOBILE,
    password: process.env.MOCK_GRANDPA_PASSWORD,
    email: process.env.MOCK_GRANDPA_EMAIL
  },
  "process.env.DEFAULT_GRANDMA_ID": {
    mobile: process.env.MOCK_GRANDMA_MOBILE,
    password: process.env.MOCK_GRANDMA_PASSWORD,
    email: process.env.MOCK_GRANDMA_EMAIL
  },
}

export default function(user: string) {
  return request<any>('/api/user/logon/account', {
    method: 'POST',
    data: { 
      env: REACT_APP_ENV || 'dev',
      ...MOCK_LOGON_MAP[user] || MOCK_LOGON_MAP['process.env.DEFAULT_FATHER_ID'],
    },
    mis: false,
  });
}