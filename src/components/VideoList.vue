<!--
  Template
-->
<template lang="jade">
div
  div.row
    nav.white.z-depth-0.col.s9
      nav.nav-wrapper.white.z-depth-0
        div.input-field
          input#search(type="search", placeholder="Search for videos", v-model="query", @keyup.enter="search")
          label.label-icon(for="search"): i.material-icons search
          i.material-icons close
    div.input-field.col.s3
      select#sortType(v-model="sortOrder")
        option(value="relevance") Relevance
        option(value="title") Title
        option(value="date") Date
        option(value="Rating") Rating
        option(value="viewCount") View Count

  div.row
    div.col.s6.m3(v-for="video in videos")
      div.card
        a.favorite-btn.btn.white.waves-effect.waves-green(@click="toggleFavorite(video)")
          i.material-icons(v-if="isFavorited(video)") favorite
          i.material-icons(v-else) favorite_border

        div.card-image(@click="goVideo(video.id.videoId || video.id)")
          img.responsive-img(:src="video.thumbnails.high.url")
          span.card-title {{ video.title }}
</template>

<!--
  Style
-->
<style scoped lang="less">
div.card {
  cursor: pointer;

  .favorite-btn {
    position: absolute;
    right: 10px;
    top: 10px;

    > i {
      color: rgba(0, 0, 0, 0.87);
    }
  }

  span.card-title {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
  }

  div.card-image {
    height: 340px; // I'd prefer not to use pixels here
    overflow: hidden;
  }
}

nav {
  input#search {
    color: #9e9e9e;

    &:focus {
      color: rgba(0, 0, 0, 0.87);
    }
  }

  label.label-icon > i {
    color: #9e9e9e;
  }
}
</style>

<!--
  Script
-->
<script>
import { mapGetters } from 'vuex';

import * as types from '../store/types';

export default {
  computed: {
    ...mapGetters({
      videos: 'list',
      favorites: 'favorites'
    }),
    query: {
      get() { return this.$store.state.videoList.searchQuery; },
      set(query) { this.$store.commit(types.RECEIVE_SEARCH_QUERY, { query }); }
    },
    sortOrder: {
      get() { return this.$store.state.videoList.sortOrder; },
      set(sort) { this.$store.commit(types.RECEIVE_SORT_ORDER, { sort }); }
    }
  },
  watch: {
    $route: {
      handler(newValue) {
        if ( newValue.query != null ) {
          this.query = newValue.query.q;
        }

        this.$store.dispatch('getVideos');
      },
      deep: true
    }
  },
  methods: {
    search() {
      this.$router.push({ 
        query: { 
          q: this.query 
        } 
      });
    },
    goVideo(videoId) {
      this.$router.push({
        name: 'video',
        params: { videoId }
      });
    },
    isFavorited(video) {
      return this.favorites.some(f => f.id === (video.id.videoId || video.id));
    },
    toggleFavorite(video) {
      if ( this.isFavorited(video) ) {
        // Remove favorite
        this.$store.dispatch('removeFavorite', video.id.videoId || video.id);
        return;
      }

      // Add favorite
      const fav = {
        id: video.id.videoId || video.id,
        thumb: video.thumbnails.high.url,
        title: video.title
      };
      this.$store.dispatch('addFavorite', fav);
    }
  },
  mounted() {
    const $sortOrder = $('#sortType');
    $sortOrder.material_select();

    // Listen for changes
    $('body').on('change.videoList', '#sortType', () => {
      this.sortOrder = $sortOrder.val();
      this.$store.dispatch('getVideos');
    });

    if ( this.$route.query != null ) {
      const query = this.$route.query;
      if ( query.q != null && query.q.length >= 3 ) {
        this.query = query.q;
      }
    }

    this.$store.dispatch('getVideos');
  } 
}
</script>