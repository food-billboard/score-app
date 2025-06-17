import request from '@/utils/request'

// 积分
export const postScoreMemory = (data: API_SCORE.PostScoreMemoryParams) => {
  return request('/api/manage/score/memory/obtain', {
    method: 'POST',
    data
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

// 奖品列表
export const getScoreAward = (params: API_SCORE.GetScoreAwardParams) => {
  return request<API_SCORE.GetListResponse<API_SCORE.GetScoreAwardData>>('/api/manage/score/award', {
    method: 'GET',
    params
  });
};