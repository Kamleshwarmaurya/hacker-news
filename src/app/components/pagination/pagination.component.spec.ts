import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { PostService } from 'src/app/services/post.service';
import { MockPostService } from 'src/app/mocks/mock.post-service';
import { of } from 'rxjs';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
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
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to make get request when #loadMoreData is called', () => {
    const postService = TestBed.inject(PostService);
    spyOn(postService, 'getPosts').and.returnValue(of({}));
    component.loadMoreData();
    expect(postService.getPosts).toHaveBeenCalledWith('&page=0');

  });

  it('should be able to call #getPosts when #loadMoreData is called', () => {
    const postService = TestBed.inject(PostService);
    spyOn(postService, 'getPosts').and.returnValue(of({}));
    component.loadMoreData();
    expect(postService.getPosts).toHaveBeenCalledWith('&page=0');

  });

  it('should be able to call #storeInStorageAccount when #loadMoreData return a response', fakeAsync(() => {
    const postService = TestBed.inject(PostService);
    spyOn(postService, 'storeInStorageAccount');
    component.loadMoreData();
    tick();
    expect(postService.storeInStorageAccount).toHaveBeenCalled();

  }));


});
