import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { IPosts } from '../interfaces/posts.interface';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  public postsSubject = new Subject<IPosts[]>();
  public posts$ = this.postsSubject.asObservable();
  public isSpinnerVisible = true;

  constructor(private http: HttpClient) { }




  /**
   * Set Item in Session Storage
   * @private
   * @param {string} key
   * @param {string} value
   * @memberof PostService
   */
  private setItemInSessionStorage(key: string, value: string) {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(key, value);
    }

  }

  /**
   * Get Item from Sesssion Storage
   * @private
   * @param {string} key
   * @returns
   * @memberof PostService
   */
  private getItemFromSessionStorage(key: string) {
    if (typeof window !== "undefined") {
      return window.sessionStorage.getItem(key);
    }

  }


  /**
   * Get Post bases on last date and type story
   * @param {string} [paginationString]
   * @returns {Observable<any>}
   * @memberof PostService
   */
  public getPosts(paginationString?: string): Observable<any> {
    let url = `${environment.apiUrl}api/v1/search_by_date?tags=story`;
    if (paginationString) {
      url = `${url}${paginationString}`;
    }
    return this.http.get(url);
  }

  /**
   * Get Votes from ObjectID
   * @param {*} objectId
   * @returns {string}
   * @memberof PostService
   */
  public getVotesById(objectId: any): string {
    const votesAndHide = this.getItemFromSessionStorage(objectId);
    if (votesAndHide) {
      return votesAndHide.split('__')[0];
    }
  }



  /**
   * Set Votes to Session Storage
   * @param {string} objectId
   * @memberof PostService
   */
  public setVote(objectId: string): void {
    const votesAndHide = this.getItemFromSessionStorage(objectId);
    if (votesAndHide) {
      const options = votesAndHide.split('__');
      this.setItemInSessionStorage(objectId, `${parseInt(options[0]) + 1}__${options[1]}`);
    }

  }


  /**
   * Hide Story
   * @param {string} objectId
   * @memberof PostService
   */
  public hideStory(objectId: string): void {
    const votesAndHide = this.getItemFromSessionStorage(objectId);
    if (votesAndHide) {
      const options = votesAndHide.split('__');
      this.setItemInSessionStorage(objectId, `${parseInt(options[0])}__0`);
    }
  }


  /**
   * Check if Post is Visible
   * @param {string} objectId
   * @returns {number}
   * @memberof PostService
   */
  public isPostVisible(objectId: string): number {
    const votesAndHide = this.getItemFromSessionStorage(objectId);
    if (votesAndHide) {
      return parseInt(votesAndHide.split('__')[1]);
    }
  }


  /**
   * Store Item in Session Storage
   * @param {IPosts[]} posts
   * @memberof PostService
   */
  public storeInStorageAccount(posts: IPosts[]) {
    posts.forEach((post: IPosts) => {
      if (!this.getItemFromSessionStorage(post.objectID)) {
        this.setItemInSessionStorage(post.objectID, `${post.points}__1`);
      }
    });
    this.postsSubject.next(posts);
  }

}
