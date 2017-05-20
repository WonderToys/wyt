import Vue from 'vue';
import Vuex from 'vuex';

import videoList from './modules/videoList';
import favorites from './modules/favorites';

Vue.use(Vuex);

// Exports
export default new Vuex.Store({
  modules: {
    videoList,
    favorites
  }
});