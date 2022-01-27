import { createStore } from 'vuex';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import createPersistedState from 'vuex-persistedstate';
import UserModule from '@/store/modules/UserModule';
import CartModule from '@/store/modules/CartModule';
import OrderSummary from '@/store/modules/OrderSummary';

export default createStore({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    User: UserModule,
    Products: CartModule,
    OrderSummary,
  },
});
