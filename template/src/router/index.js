import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

// 路由配置
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = Boolean(localStorage.getItem('token')) // 示例逻辑
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  }
  else {
    next()
  }
})

export default router
