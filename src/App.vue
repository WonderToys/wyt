<!--
  Template
-->
<template lang="jade">
div#app
  app-navigation

  div#mainContent
    router-view
</template>

<!--
  Script
-->
<script>
import AppNavigation from './components/AppNavigation.vue';

export default {
  name: 'app',
  components: {
    AppNavigation
  }
}
</script>
