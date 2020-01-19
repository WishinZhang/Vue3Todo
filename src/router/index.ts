import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';
import Main from '@views/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/all'
  },
  {
    path: '/:state',
    name: 'main',
    component: Main
  }
];

const router = new VueRouter({
  routes
} as RouterOptions);

export default router;
