<!--
  Template
-->
<template lang="jade">
ul#favorites.side-nav
  li.center-align(v-if="favorites == null || favorites.length === 0") You have no favorites :(
  div(v-else)
    li(v-for="fav in favorites")
      div.favorite
        router-link.thumbnail(:to="{ name: 'video', params: { videoId: fav.id } }")
          h6 {{ fav.title }}
          img(:src="fav.thumb")
        a.delete.valign-wrapper(href="javascript:void(0)", @click="removeFavorite(fav.id)")
          i.material-icons delete
          span Remove
</template>

<!--
  Style
-->
<style scoped lang="less">
.favorite {
  padding: 1rem;

  h6 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  img {
    width: 100%;
  }

  a {
    &.thumbnail {
      line-height: 0;
      display: block;
    }

    &.delete {
      margin-top: 0.6rem;
      line-height: 1.1rem;

      > i {
        font-size: 1.1rem;
      }

      span {
        font-size: 1.1rem;
        margin-left: 0.3rem;
      }
    }
  }
}
</style>

<!--
  Script
-->
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([ 'favorites' ])
  },
  methods: {
    removeFavorite(id) {
      this.$store.dispatch('removeFavorite', id);
    }
  },
  mounted() {
    this.$store.dispatch('getFavorites');
  }
}
</script>