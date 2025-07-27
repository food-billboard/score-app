import request from '@/utils/request'

// 获取当前用户信息
export async function getUserInfo() {
  return request<any>('/api/user/customer', {
    method: 'GET',
    params: {
      _id: process.env.DEFAULT_CHILD_ID
    }
  });
}

// 积分
export const putScoreMemory = (data: API_SCORE.PutScoreMemoryParams) => {
  return request('/api/manage/score/memory/obtain', {
    method: 'PUT',
    data
  });
};

// 积分记录
export const getScoreMemoryList = (params: API_SCORE.GetScoreMemoryListParams) => {
  return request<API_SCORE.GetListResponse<API_SCORE.GetScoreMemoryListData>>('/api/manage/score/memory/obtain', {
    method: 'GET',
    params
  });
};

// 兑换
export const postScoreExchangeMemory = (data: API_SCORE.PostScoreExchangeMemoryParams) => {
  return request('/api/manage/score/memory/exchange', {
    method: 'POST',
    data
  });
};

// 核销
export const checkScoreExchangeMemory = (data: API_SCORE.CheckScoreExchangeMemoryParams) => {
  return request('/api/manage/score/memory/exchange', {
    method: 'PUT',
    data
  });
};

// 分类列表
export const getScoreClassifyList = (params: API_SCORE.GetScoreClassifyListParams) => {
  return request<API_SCORE.GetListResponse<API_SCORE.GetScoreClassifyListData>>('/api/manage/score/classify', {
    method: 'GET',
    params
  });
};

// 一级分类列表
export const getScorePrimaryClassifyList = (params: API_SCORE.GetScorePrimaryClassifyListParams) => {
  return request<API_SCORE.GetListResponse<API_SCORE.GetScorePrimaryClassifyListData>>('/api/manage/score/classify/primary', {
    method: 'GET',
    params
  });
};

// 奖品列表
export const getScoreAward = (params: API_SCORE.GetScoreAwardParams) => {
  return request<API_SCORE.GetListResponse<API_SCORE.GetScoreAwardData>>('/api/manage/score/award', {
    method: 'GET',
    params
  });
};