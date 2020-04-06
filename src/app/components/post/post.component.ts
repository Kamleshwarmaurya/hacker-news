import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  public posts: any;
  public index: number = 0;

  constructor(private postService: PostService) { }

  public ngOnInit(): void {

    this.postService.getPosts()
      .subscribe((posts) => {
        this.posts = posts;
      });
  }

  public loadMoreData(): void {
    this.postService.getPosts(`&page=${this.index}`)
      .subscribe((posts) => {
        this.posts = posts;
      });
    this.index++;
  }

}
