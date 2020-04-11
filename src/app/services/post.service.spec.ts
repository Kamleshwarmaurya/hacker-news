import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
const posts = [
  {
    created_at: '2020-04-10T10:01:33.000Z',
    title: 'Firefox 75.0',
    url: 'https://www.mozilla.org/en-US/firefox/75.0/releasenotes/',
    author: 'abhiminator',
    points: 1,
    story_text: null,
    comment_text: null,
    num_comments: 0,
    story_id: null,
    story_title: null,
    story_url: null,
    parent_id: null,
    created_at_i: 1586512893,
    _tags: [
      'story',
      'author_abhiminator',
      'story_22831506'
    ],
    objectID: '22831506',
    _highlightResult: {
      title: {
        value: 'Firefox 75.0',
        matchLevel: 'none',
        matchedWords: []
      },
      url: {
        value: 'https://www.mozilla.org/en-US/firefox/75.0/releasenotes/',
        matchLevel: 'none',
        matchedWords: []
      },
      author: {
        value: 'abhiminator',
        matchLevel: 'none',
        matchedWords: []
      }
    }
  }, {
    created_at: '2020-04-10T10:01:33.000Z',
    title: 'Firefox 75.0',
    url: 'https://www.mozilla.org/en-US/firefox/75.0/releasenotes/',
    author: 'abhiminator',
    points: 1,
    story_text: null,
    comment_text: null,
    num_comments: 0,
    story_id: null,
    story_title: null,
    story_url: null,
    parent_id: null,
    created_at_i: 1586512893,
    _tags: [
      'story',
      'author_abhiminator',
      'story_22831506'
    ],
    objectID: '22831506',
    _highlightResult: {
      title: {
        value: 'Firefox 75.0',
        matchLevel: 'none',
        matchedWords: []
      },
      url: {
        value: 'https://www.mozilla.org/en-US/firefox/75.0/releasenotes/',
        matchLevel: 'none',
        matchedWords: []
      },
      author: {
        value: 'abhiminator',
        matchLevel: 'none',
        matchedWords: []
      }
    }
  }
];

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]

    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should able to make http get request when #getPosts is called', () => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get');
    service.getPosts();
    expect(http.get).toHaveBeenCalledWith('http://hn.algolia.com/api/v1/search_by_date?tags=story');
  });
  it('should able to get votes based on ObjectID when #getVotesById is called', () => {
    window.sessionStorage.setItem('123456', '1111__1');
    expect(service.getVotesById('123456')).toEqual('1111');
  });

  it('should able to set votes based on objectId when #setVote is called', () => {
    window.sessionStorage.setItem('123456', '1111__1');
    service.setVote('123456');
    expect(window.sessionStorage.getItem('123456')).toEqual('1112__1');

  });

  it('should able to hide Story when #hideStory is called', () => {
    window.sessionStorage.setItem('123456', '1111__1');
    service.hideStory('123456');
    expect(window.sessionStorage.getItem('123456')).toEqual('1111__0');
  });

  it('should able to return visibility state when #isPostVisible is called', () => {
    window.sessionStorage.setItem('123456', '1111__1');
    expect(service.isPostVisible('123456')).toEqual(1);
  });

  it('should able to store values in session Storage when #storeInStorageAccount is called', () => {
    service.storeInStorageAccount(posts);
    expect(window.sessionStorage.getItem('22831506')).toEqual('1__1');
  });

});


