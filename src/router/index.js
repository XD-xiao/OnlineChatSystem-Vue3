import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue'),
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/main/alonechat',
      children: [
        {
          path: '/main/alonechat',
          component: () => import('@/views/alonechat/AloneChatContainer.vue'),
        },
        {
          path: '/main/groupchat',
          component: () => import('@/views/groupchat/GroupChatContainer.vue'),
        },
        {
          path:'/main/contacts',
          component: () => import('@/views/contacts/ContactsContainer.vue'),
        },
        {
          path: '/main/review',
          component: () => import('@/views/review/ReviewContainer.vue'),
        },
        {
          path:'/main/settings',
          component: () => import('@/views/setting/SettingContainer.vue'),
        }
      ],

    },
  ],
})

// 登录访问拦截
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

export default router
