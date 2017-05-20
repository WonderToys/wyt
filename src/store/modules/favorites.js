import * as types from '../types';

const FAVORITES_KEY = 'wyt_favorites';

// -----
//  State
// -----

const state = {
  favorites: []
};

// -----
//  Getters
// -----

const getters = {
  favorites: state => state.favorites
};

// -----
//  Actions
// -----

const actions = {
  getFavorites({ commit }) {
    let favs = [];
    try {
      favs = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    } catch ( e ) {}

    commit(types.RECEIVE_FAVORITE_LIST, { favorites: favs });
  },
  addFavorite({ commit }, data) {
    commit(types.ADD_FAVORITE_ITEM, { favorite: data });
  },
  removeFavorite({ commit }, id) {
    commit(types.REMOVE_FAVORITE_ITEM, { id });
  }
};

// -----
//  Mutations
// -----

const mutations = {
  [types.RECEIVE_FAVORITE_LIST](state, { favorites }) {
    state.favorites = favorites;
  },

  [types.ADD_FAVORITE_ITEM](state, { favorite }) {
    state.favorites.push(favorite);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
  },

  [types.REMOVE_FAVORITE_ITEM](state, { id }) {
    state.favorites = state.favorites.filter(f => f.id !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.favorites));
  }
};

// Exports
export default {
  state,
  getters,
  actions,
  mutations
}