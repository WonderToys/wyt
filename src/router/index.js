import Vue from 'vue'
import Router from 'vue-router'

import Video from '@/components/Video.vue';
import VideoList from '@/components/VideoList.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'videos',
      path: '/videos',
      component: VideoList
    },
    {
      name: 'video',
      path: '/video/:videoId',
      component: Video
    },
    {
      path: '*',
      redirect: '/videos'
    }
  ]
})
