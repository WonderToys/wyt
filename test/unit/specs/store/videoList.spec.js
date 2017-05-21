import { expect } from 'chai';
import videoList from '../../../../src/store/modules/videoList';
import * as types from '../../../../src/store/types';

// -----
//  Mocks
// -----

const mockState = {
  videos: [],
  video: null,
  commentPageToken: null,
  commentThreads: []
};

// -----
//  Mutations
// -----

describe('videoList Store', () => {
  describe('mutations', () => {
    // RECEIVE_VIDEO_LIST
    it(types.RECEIVE_VIDEO_LIST, () => {
      const videos = [{
        id: '-1',
        snippet: {
          title: 'Test'
        }
      }];
      videoList.mutations[types.RECEIVE_VIDEO_LIST](mockState, { videos });

      const expected = [{ id: '-1', title: 'Test' }];
      expect(mockState.videos).to.deep.equal(expected);
    }); //- RECEIVE_VIDEO_LIST

    // RECEIVE_VIDEO
    it(types.RECEIVE_VIDEO, () => {
      const video = {
        id: '-1',
        snippet: {
          title: 'Test'
        }
      };
      videoList.mutations[types.RECEIVE_VIDEO](mockState, { video });

      expect(mockState.video).to.deep.equal(video);
    }); //- RECEIVE_VIDEO

    // RECEIVE_VIDEO_COMMENTS
    it(types.RECEIVE_VIDEO_COMMENTS, () => {
      let comments = [{
        id: '-1',
        snippet: {
          topLevelComment: {
            snippet: {
              title: 'Test'
            }
          }
        }
      }];
      videoList.mutations[types.RECEIVE_VIDEO_COMMENTS](mockState, { comments });

      let expected = [{ id: '-1', title: 'Test' }];
      expect(mockState.commentThreads).to.deep.equal(expected);

      comments = [];
      videoList.mutations[types.RECEIVE_VIDEO_COMMENTS](mockState, { comments });

      expect(mockState.commentPageToken).to.equal(null);
      expect(mockState.commentThreads).to.deep.equal(comments);
    }); //- RECEIVE_VIDEO_COMMENTS

    // RECEIVE_COMMENT_PAGE_TOKEN
    it(types.RECEIVE_COMMENT_PAGE_TOKEN, () => {
      const token = '123';
      videoList.mutations[types.RECEIVE_COMMENT_PAGE_TOKEN](mockState, { token });

      expect(mockState.commentPageToken).to.deep.equal(token);
    }); //- RECEIVE_COMMENT_PAGE_TOKEN
  });
});