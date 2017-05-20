<!--
  Template
-->
<template lang="jade">
div.navbar-fixed
  nav
    div.nav-wrapper
      div.container
        a.brand-logo(href="/")
          i.material-icons ondemand_video
          | WYT
        ul.right
          li
            a#favoritesToggle.button-collapse.show-on-large(href="javascript:void(0);", data-activates="favorites")
              i.material-icons.left favorite
              | Favorites
</template>

<!--
  Style
-->
<style scoped lang="less">
nav .container {
  height: 100%;
}
</style>

<!--
  Script
-->
<script>
export default {
  mounted() {
    $('#favoritesToggle').sideNav({
      edge: 'right'
    });
  } 
}
</script>