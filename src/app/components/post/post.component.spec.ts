import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { PostService } from 'src/app/services/post.service';
import { MockPostService } from 'src/app/mocks/mock.post-service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { of } from 'rxjs';
import { PaginationComponent } from '../pagination/pagination.component';
const response = [
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

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent, SpinnerComponent, PaginationComponent],
      providers: [
        {
          provide: PostService,
          useClass: MockPostService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should able to set posts when component is init', () => {
    const postService = TestBed.inject(PostService);
    component.ngAfterViewInit();
    postService.postsSubject.next(response);
    expect(component.posts[0].objectID).toEqual('22831506');

  });
});
