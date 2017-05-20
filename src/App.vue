<!--
  Template
-->
<template lang="jade">
div#app
  app-navigation
  favorites

  div#mainContent
    router-view
</template>

<!--
  Script
-->
<script>
import AppNavigation from './components/AppNavigation.vue';
import Favorites from './components/Favorites.vue';

export default {
  name: 'app',
  components: {
    AppNavigation,
    Favorites
  }
}
</script>
