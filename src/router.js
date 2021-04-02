import Vue from 'vue';
import Router from 'vue-router';

const SignIn = () => import('./components/SignIn.vue');
const Register = () => import('./components/Register.vue');
const Home = () => import('./components/Home.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: SignIn,
    },
    {
      path: '/Register',
      component: Register,
    },
    {
      path: '/Home',
      component: Home,
    },
  ],
});
