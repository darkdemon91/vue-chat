import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login';
import ChatDashboard from '../views/ChatDashboard';
import store from '../store/index'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatDashboard,
      meta: {
        authRequired: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.authRequired)) {
    if(store.state.user === null) {
      next({
        path:'/'
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router;
