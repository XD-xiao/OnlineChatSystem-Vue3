import request from "@/utils/request.js";

export const getFriendListService = () =>
    request.post('/api/Contacts/getFriendList')

export const getGroupListService = () =>
    request.post('/api/Contacts/getGroupList')

export const getFriendInfoService = (userId) =>
    request.post('/api/Contacts/getFriendInfo', { userId})

export const deleteFriendService = (userId) =>
    request.post('/api/Contacts/deleteFriend', { userId})

export const getGroupInfoService = (groupId) =>
    request.post('/api/groupChat/getGroupInfo', { groupId})

export const deleteGroupService = (groupId) =>
    request.post('/api/groupChat/deleteGroup', { groupId})

export const updateGroupInfoService = ( groupId, remark , synopsis) =>
    request.post('/api/groupChat/updateGroupInfo', {groupId, remark, synopsis})

export const deleteGroupMemberService = (groupId, userId) =>
    request.post('/api/groupChat/deleteGroupMember', {groupId, userId})

export const getUserInfoService = () =>
    request.post('/api/Contacts/getUserInfo')

export const updateUserInfoService = (nickName, avatar) =>
    request.post('/api/Contacts/updateUserInfo', {nickName, avatar})
