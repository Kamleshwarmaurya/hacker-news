import { Component, } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  constructor(private postService: PostService) { }



  /**
   * Get More data from API based on current pagination
   * @memberof PaginationComponent
   */
  public loadMoreData(): void {
    this.postService.isSpinnerVisible = true;
    this.postService.getPosts(`&page=${this.postService.index}`)
      .pipe(take(1))
      .subscribe((posts) => {
        this.postService.storeInStorageAccount(posts.hits);
      });
      this.postService.index ++;
  }

}
