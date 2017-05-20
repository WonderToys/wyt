import Vue from 'vue';
import Vuex from 'vuex';

import videoList from './modules/videoList';

Vue.use(Vuex);

// Exports
export default new Vuex.Store({
  modules: {
    videoList
  }
});