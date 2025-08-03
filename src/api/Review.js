import request from "@/utils/request.js";


export const getApplyInfoListService = () =>
    request.post('/api/applyInfo/getApplyInfoList')

export const updateAcceptFriendService = ( applyInfo ,  status) =>
    request.post('/api/applyInfo/updateApplyFriend', {applyInfo, status})

export const updateAcceptGroupService = ( applyInfo ,  status) =>
    request.post('/api/applyInfo/updateApplyGroup', {applyInfo, status})
