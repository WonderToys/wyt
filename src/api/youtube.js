// -----
//  Helpers
// -----

// loadGapi()
const loadGapi = function loadGapi() {
  return new Promise((resolve, reject) => {
    if ( gapi.client != null && gapi.client.youtube != null ) {
      return resolve(gapi.client.youtube);
    }

    gapi.load('client', () => {
      gapi.client.init({
        'apiKey': 'AIzaSyBHayHhiE2BYfudKFpl7_wVUjibFnXaNwg'
      })
      .then(() => gapi.client.load('youtube', 'v3'))
      .then(() => resolve(gapi.client.youtube));
    });
  });
}; //- loadGapi()

// -----
//  Exports
// -----

// getCommentsForVideo()
export const getCommentsForVideo = function getCommentsForVideo(data) {
  if ( data == null || data.videoId == null ) return;

  return loadGapi()
    .then((youtube) => {
      return youtube.commentThreads.list({
        part: 'snippet,replies',
        videoId: data.videoId,
        maxResults: 24,
        pageToken: data.pageToken
      });
    })
    .then((data) => data.result);
}; //- getCommentsForVideo()

// getVideoById()
export const getVideoById = function getVideoById(id, maxWidth) {
  return loadGapi()
    .then((youtube) => {
      return youtube.videos.list({
        part: 'snippet,statistics,player', 
        id, maxWidth
      });
    })
    .then((data) => data.result);
}; //- getVideoById()

// getTopVideos()
export const getTopVideos = function getTopVideos(data) {
  return loadGapi()
    .then((youtube) => {
      return youtube.videos.list({
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 48,
        pageToken: data.pageToken
      });
    })
    .then((data) => data.result);
}; //- getTopVideos()

// searchVideos()
export const searchVideos = function searchVideos(data) {
  return loadGapi()
    .then((youtube) => {
      return youtube.search.list({
        part: 'snippet',
        q: data.query,
        maxResults: 48,
        type: 'video',
        order: data.order,
        pageToken: data.pageToken
      });
    })
    .then((data) => data.result);
}; //- searchVideos()