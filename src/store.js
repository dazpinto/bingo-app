import Vue from 'vue';
import Vuex from 'vuex';
import { getField, updateField } from 'vuex-map-fields';

import { has, includes, range, last, pull, sample } from 'lodash';
import { MIN_NUMBER, MAX_NUMBER, BINGO_CALLS } from './constants.js';

Vue.use(Vuex);

const dabberStyles = [
  'purple',
  'blue',
  'red',
  'orange',
  'yellow',
  'green',
];

export default new Vuex.Store({
  state: {
    unDrawnNumbers: range(MIN_NUMBER, MAX_NUMBER + 1),
    drawnNumbers: [],
    dabberStyle: dabberStyles[0],
    dabberStyles,
  },
  getters: {
    getField,
    hasLastBingoCall: (state, getters) => has(BINGO_CALLS, getters.lastDrawnNumber),
    lastBingoCall: (state, getters) => sample(BINGO_CALLS[getters.lastDrawnNumber]),
    lastDrawnNumber: state => last(state.drawnNumbers),
    hasDrawn: state => (num) => includes(state.drawnNumbers, num),
    dabberClass: state => `dab--${state.dabberStyle}`,
  },
  mutations: {
    updateField,
    drawNumber(state) {
      const theNumber = sample(state.unDrawnNumbers);
      pull(state.unDrawnNumbers, theNumber);
      state.drawnNumbers.push(theNumber);
    },

    updateDabberStyle(state, val) {
      state.dabberStyle = val;
    }
  },
})
