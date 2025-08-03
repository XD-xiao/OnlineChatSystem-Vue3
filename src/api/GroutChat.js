import request from "@/utils/request.js";

export const getGroupChatListService = () =>
    request.post('/api/groupChat/getGroupChatList')

export const getChatHistoryService = (groupId) =>
    request.post('/api/groupChat/getChatHistory', { groupId})

export const sendMessageToGroupService = (groupId, content) =>
    request.post('/api/groupChat/sendMessage', { groupId, content})

export const getGroupDataService = (groupId) =>
    request.post('/api/groupChat/getGroupData', { groupId})

export const updateGroupDataService = ( groupId, remark) =>
    request.post('/api/groupChat/updateGroupData', groupId, remark)


