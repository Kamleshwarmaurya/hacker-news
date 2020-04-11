import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { IPosts } from 'src/app/interfaces/posts.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit, AfterViewInit {


  private unsubscribe: Subject<void> = new Subject<void>();
  public posts: IPosts[];

  public isSpinnerVisible = true;

  constructor(public postService: PostService, private ref: ChangeDetectorRef) { }

  public ngOnInit(): void {

    this.postService.getPosts()
      .subscribe((posts) => {
        this.postService.storeInStorageAccount(posts.hits);
      });
  }

  public ngAfterViewInit() {
    this.postService.posts$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((posts) => {
        this.posts = posts;
        this.postService.isSpinnerVisible = false;
        this.ref.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
