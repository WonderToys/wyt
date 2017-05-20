<!--
  Template
-->
<template lang="jade">
div.video-wrapper(v-if="video != null")
  div.container
    //- Video & Details
    div.row
      div#videoDetails.center
        h4 {{ video.snippet.title }}
        div(v-html="video.player.embedHtml")
        div.video-info
          div.col.s5.left-align
            h5: a(:href="`http://youtube.com/channel/${ video.snippet.channelId }`", target="_blank") {{ video.snippet.channelTitle }}
          div.col.s3.center-align
            h5 {{ formatNumber(video.statistics.viewCount) }} Views
          div.col.s4.right-align
            h5 
              span.green-text {{ formatNumber(video.statistics.likeCount) }} Up 
              span -- 
              span.red-text {{ formatNumber(video.statistics.likeCount) }} Down

    //- Comments
    div.row
      div.col.s12.comment(v-for="comment in comments")
        div.meta
          a(:href="comment.authorChannelUrl", target="_blank") {{ comment.authorDisplayName }}
          span.published {{ formatFromNow(comment.publishedAt) }}
          span.likes(:class="{ 'green-text': comment.likeCount > 0, 'red-text': comment.likeCount < 0 }", v-if="comment.likeCount > 0") (+{{ comment.likeCount }})
        p(v-html="comment.textDisplay")

      a#moreComments.btn.waves-effect.waves-light(href="javascript:void(0);", v-if="commentPageToken != null && commentPageToken.length > 0"
                                                  @click="getMoreComments") More Comments
</template>

<!--
  Style
-->
<style scoped lang="less">
#videoDetails {
  border-bottom: 1px solid #ccc;

  .video-info {
    text-align: left;
    overflow: hidden;
    margin-bottom: 0.5rem;

    &:after {
      clear: both;
    }
  }
}

.comment {
  border-bottom: 1px solid rgba(0, 0, 0, 0.10);
  margin-top: 1rem;

  .meta {
    .published {
      margin-left: 0.5rem;
      font-size: 0.9rem;
      color: rgba(0, 0, 0, 0.75);
    }

    .likes {
      margin-left: 0.5rem;
      font-size: 0.9rem;
    }
  }

  p {
    margin: 0.5rem 0;
  }

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    border-bottom: none;
  }
}

a#moreComments {
  margin-top: 1rem;
}
</style>

<!--
  Script
-->
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([ 'video', 'comments', 'commentPageToken' ])
  },
  methods: {
    formatNumber(num) {
      num = parseInt(num || 0);
      return num.toLocaleString();
    },
    formatFromNow(time) {
      return moment(time).fromNow();
    },
    getMoreComments() {
      this.$store.dispatch('getVideoComments', { videoId: this.$route.params.videoId });
    }
  },
  mounted() {
    this.$store.dispatch('getSingleVideo', { 
      id: this.$route.params.videoId,
      maxWidth: $('nav .container').width()
    });
  }
}
</script>