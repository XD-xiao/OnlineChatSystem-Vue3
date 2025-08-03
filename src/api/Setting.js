import request from "@/utils/request.js";


export const getMyUserInfoService = () =>
    request.post('/api/aloneChat/getMyUserInfo')

export const updateMyUserInfoService= ( userInfo) =>
    request.post('/api/aloneChat/updateMyUserInfo', userInfo)

export const getLoginRecordService = () =>
    request.post('/api/aloneChat/getLoginRecord')

