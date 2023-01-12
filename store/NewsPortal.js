/* eslint-disable */
export const state = () => ({
  list: [],
  checkeds: [],
  barchart: []
});

export const mutations = {
  init(state, list) {
    state.list = list
    state.checkeds = list
  },
  checkeds(state, checkeds) {
    state.checkeds = checkeds
  },
  barchart(state, barchart) {
    state.barchart = barchart
  }
};
