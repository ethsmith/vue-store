import { Commit } from 'vuex';

export default {
  namespaced: true,
  state: {
    summary: [],
  },
  mutations: {
    SET_SUMMARY: (state: { summary: [] }, summary: []) => {
      state.summary = summary;
    },
  },
  actions: {
    setSummary: ({ commit }: { commit: Commit }, summary: []) => {
      commit('SET_SUMMARY', summary);
    },
  },
};
