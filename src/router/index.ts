import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AppLogin from '@/views/AppLogin.vue';
import AppHome from '../views/AppHome.vue';
import OrderSummary from '@/views/OrderSummary.vue';
// import component from '*.vue';
import AppWrapper from '@/components/AppWrapper.vue';
import AppRegister from '@/views/AppRegister.vue';
import AppCart from '@/views/AppCart.vue';
import ProductDetails from '@/views/ProductDetails.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: AppLogin,
  },
  {
    path: '/register',
    component: AppRegister,
  },
  {
    path: '/',
    component: AppWrapper,
    children: [
      {
        path: '/',
        name: 'Home',
        component: AppHome,
      },
      {
        path: '/cart',
        name: 'Cart',
        component: AppCart,
      },
      {
        path: '/order-summary',
        name: 'Summary',
        component: OrderSummary,
      },
      {
        path: '/details/:id',
        name: 'Details',
        component: ProductDetails,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
