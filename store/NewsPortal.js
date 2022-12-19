/* eslint-disable */
export const state = () => ({
  list: [],
});

export const mutations = {
  init(state, list) {
    state.list = list
  },
};
