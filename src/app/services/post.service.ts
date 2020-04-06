import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

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
}
