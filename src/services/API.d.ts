declare namespace Upload {
  export interface IDeleteParams {
    _id: string;
  }

  export interface ILooadParams {
    load: string;
  }

  export interface UploadParams {
    file: File;
  }

  export type TAuthType = 'PRIVATE' | 'PUBLIC';

  export interface ICheckUploadFileParams {
    'Tus-Resumable': '1.0.0';
    md5: string;
    auth: TAuthType;
    size: number;
    mime: string;
    name?: string;
    chunk: number;
  }

  export interface ICheckUploadFileRes {
    'Tus-Resumable': '1.0.0';
    location: string;
    'Upload-Offset': number;
    'Upload-Length': number;
    'Upload-Id': string;
  }

  export interface UploadRes {
    _id: string;
    url: string;
  }

  export interface IUploadParams {
    md5: string;
    offset: number;
    file: Blob;
  }

  export interface IGetUploadParams {
    _id: string;
    type?: 0 | 1 | 2;
  }
}

declare namespace API_SCORE {
  export type GetListResponse<T> = {
    total: number;
    list: T[];
  };

  export type GetScoreMemoryListParams = {
    content?: string;
    start_date?: string;
    end_date?: string;
    currPage?: number;
    pageSize?: number;
    target_classify?: string;
    score_type?: string;
    target_score?: string;
  };

  export type GetScoreMemoryListData = {
    _id: string;
    target_user: string;
    target_user_name: string;
    create_user: string;
    create_user_name: string;
    target_score: number;
    create_content: string;
    create_description: string;
    createdAt: string;
    updatedAt: string;
    target_classify: string;
    target_classify_name: string;
    target_classify_image: string;
    target_primary_classify: string;
    target_primary_classify_name: string;
    score_type: string;
  };

  export type GetExchangeMemoryListParams = {
    content?: string 
    checked?: boolean 
    check_start_date?: string;
    check_end_date?: string;
    start_date?: string;
    end_date?: string;
    currPage?: number;
    pageSize?: number;
  };

  export type GetExchangeMemoryListData = {
    _id: string;
    award: string;
    award_name: string;
    award_exchange_score: string;
    award_image_list: string[];
    check_date: string;
    check_state: string 
    reason: string 
    exchange_target: string;
    exchange_target_name: string;
    exchange_user: string;
    exchange_user_name: string;
    createdAt: string;
    updatedAt: string;
  };

  export type PutScoreMemoryParams = {
    _id: string;
    create_content: string;
    create_description?: string;
    target_score: number;
    score_type: string;
  };

  export type GetScoreExchangeMemoryListParams = {
    content?: string;
    start_date?: string;
    end_date?: string;
    check_start_date?: string;
    check_end_date?: string;
    checked?: boolean;
    currPage?: number;
    pageSize?: number;
  };

  export type GetScoreExchangeMemoryListData = {
    _id: string;
    exchange_user: string;
    exchange_user_name: string;
    exchange_target: string;
    exchange_target_name: string;
    award_name: string;
    award_exchange_score: string;
    award_image_list: string[];
    check_time: string;
    createdAt: string;
    updatedAt: string;
    currPage: number;
    pageSize: number;
  };

  export type PostScoreExchangeMemoryParams = {
    target_user: string;
    award: string;
  };

  export type CheckScoreExchangeMemoryParams = {
    _id: string;
    check_state: string 
    reason?: string 
  };

  export type GetScoreClassifyListParams = {
    content?: string;
    start_date?: string;
    end_date?: string;
    currPage?: number;
    pageSize?: number;
  };

  export type GetScoreClassifyListData = {
    _id: string;
    create_user: string;
    create_user_name: string;
    primary_id: string;
    primary_name: string;
    content: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    image: string;
  };

  export type PutScoreClassifyParams = {
    _id: string;
    content: string;
    description?: string;
  };

  export type PostScoreClassifyParams = {
    content: string;
    description?: string;
  };

  export type DeleteScoreClassifyParams = {
    _id: string;
  };

  export type GetScoreAwardParams = {
    content?: string;
    inventory?: string;
    exchange_score?: string;
    award_cycle?: string;
    start_date?: string;
    end_date?: string;
    currPage?: number;
    pageSize?: number;
  };

  export type GetScoreAwardData = {
    _id: string;
    inventory: number;
    exchange_score: number;
    award_image_list: string[];
    award_name: string;
    award_cycle: string;
    award_cycle_count: number;
    award_description: string;
    createdAt: string;
    updatedAt: string;
  };

  export type PutScoreAwardParams = {
    award_name: string;
    award_description?: string;
    award_image_list: string[];
    award_cycle: string;
    award_cycle_count: number;
    inventory: number;
    exchange_score: number;
    _id: string;
  };

  export type PostScoreAwardParams = {
    award_name: string;
    award_description?: string;
    award_image_list: string[];
    award_cycle: string;
    award_cycle_count: number;
    inventory: number;
    exchange_score: number;
  };

  export type DeleteScoreAwardParams = {
    _id: string;
  };

  export type GetScorePrimaryClassifyListParams = {
    content?: string;
  };

  export type GetScorePrimaryClassifyListData = {
    _id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}
