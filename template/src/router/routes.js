const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
]

export default routes
