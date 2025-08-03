import {defineStore} from "pinia";
import {ref} from "vue";
// import {userGetInfoService} from "@/api/user";


// 用户模块 token setToken removeToken
export const useUserStore = defineStore('userStore', () =>{
    // token
    const token = ref('');
    const setToken = (newToken) => {
        token.value = newToken
    }
    const removeToken = () => {
        token.value = ''
    }
    // 用户信息
    const user = ref({})
    const getUser  = async () => {
        // const res = await userGetInfoService()
        // user.value = res.data.data
    }

    // 分组信息
    const groupList = ref([]);
    const getGroupList = () => {
        // const res = await groupListService()
        // groupList.value = res.data.data
        groupList.value = [
            {
                groupId: 1,
                groupName: "朋友",
            },
            {
                groupId: 2,
                groupName: "家人",
            },
            {
                groupId: 3,
                groupName: "同事",
            }
        ];
    }

    const myTheme = ref('');
    const setMyTheme = (newTheme) => {
        myTheme.value = newTheme
    }
    const getMyTheme = () => {
        return myTheme.value
    }


    return {
        token,
        setToken,
        removeToken,
        user,
        getUser,
        groupList,
        getGroupList,
        myTheme,
        setMyTheme,
        getMyTheme
    }
},{
    persist: true
})

