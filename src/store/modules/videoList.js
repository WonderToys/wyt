import * as youtube from '../../api/youtube';
import * as types from '../types';

// -----
//  State
// -----

const state = {
  searchQuery: '',
  sortOrder: 'relevance',
  videos: [],
  video: null,
  commentThreads: [],
  commentPageToken: null
};

// -----
//  Getters
// -----

const getters = {
  list: state => state.videos,
  query: state => state.searchQuery,
  sort: state => state.sortOrder,
  video: state => state.video,
  comments: state => state.commentThreads,
  commentPageToken: state => state.commentPageToken
};

// -----
//  Actions
// -----

const actions = {
  getVideos({ state, dispatch }, data) {
    data = data || {};

    if ( state.searchQuery == null || state.searchQuery.length < 3 ) {
      dispatch('getTopVideos', data);
    }
    else {
      data = Object.assign(data, {
        query: state.searchQuery,
        order: state.sortOrder
      })
      dispatch('getSearchResults', data);
    }
  },
  getVideoComments({ state, commit }, data) {
    if ( data == null || data.videoId == null ) return;
    data.pageToken = state.commentPageToken;

    youtube.getCommentsForVideo(data)
      .then((result) => {
        commit(types.RECEIVE_VIDEO_COMMENTS, { 
          comments: result.items
        });
        commit(types.RECEIVE_COMMENT_PAGE_TOKEN, { token: result.nextPageToken });
      });
  },
  getSingleVideo({ commit, dispatch }, data) {
    if ( data == null || data.id == null ) return;

    youtube.getVideoById(data.id, data.maxWidth)
      .then((result) => {
        commit(types.RECEIVE_VIDEO, { video: result.items[0] });
        commit(types.RECEIVE_VIDEO_COMMENTS, { comments: [] });

        dispatch('getVideoComments', { videoId: data.id });
      });
  },
  getSearchResults({ commit }, data) {
    youtube.searchVideos(data)
      .then((result) => {
        commit(types.RECEIVE_VIDEO_LIST, { videos: result.items });
      });
  },
  getTopVideos({ commit }, data) {
    youtube.getTopVideos(data)
      .then((result) => {
        commit(types.RECEIVE_VIDEO_LIST, { videos: result.items });
      });
  }
};

// -----
//  Mutations
// -----

const mutations = {
  [types.RECEIVE_SEARCH_QUERY](state, { query }) {
    state.searchQuery = query;
  },

  [types.RECEIVE_VIDEO](state, { video }) {
    state.video = video;
  },

  [types.RECEIVE_VIDEO_LIST](state, { videos }) {
    state.videos = videos.map(v => {
      return {
        id: v.id,
        ...v.snippet
      }
    });
  },

  [types.RECEIVE_SORT_ORDER](state, { sort }) {
    state.sortOrder = sort;
  },

  [types.RECEIVE_VIDEO_COMMENTS](state, { comments }) {
    if ( comments.length == 0 ) {
      state.commentPageToken = null;
      state.commentThreads = [];

      return;
    }

    state.commentThreads = state.commentThreads.concat(comments.map(c => {
      return {
        id: c.id,
        ...c.snippet.topLevelComment.snippet
      }
    }));
  },

  [types.RECEIVE_COMMENT_PAGE_TOKEN](state, { token }) {
    state.commentPageToken = token;
  }
};

// Exports
export default {
  state,
  getters,
  actions,
  mutations
}