import { Commit } from 'vuex';

export default {
  namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS: (state: { products: [] }, products: []) => {
      state.products = products;
    },
  },
  actions: {
    setProducts: ({ commit }: { commit: Commit }, products: []) => {
      commit('SET_PRODUCTS', products);
    },
  },
};
