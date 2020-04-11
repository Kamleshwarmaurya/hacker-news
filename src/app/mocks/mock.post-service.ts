import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { IPosts } from '../interfaces/posts.interface';


const response = {
    hits: [
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
        }
    ]
};

@Injectable({
    providedIn: 'root'
})
export class MockPostService {

    public postsSubject = new Subject<IPosts[]>();
    public posts$ = this.postsSubject.asObservable();

    constructor() { }

    public getPosts(paginationString?: string): Observable<any> {
        return of(response);
    }


    public setItemInSessionStorage(key: string, value: string) {
        window.sessionStorage.setItem(key, value);
    }

    public getItemFromSessionStorage(key: string) {
        return window.sessionStorage.getItem(key);
    }

    public getVotesById(objectId: any): string {
        const votesAndHide = this.getItemFromSessionStorage(objectId);
        return votesAndHide.split('__')[0];
    }

    public setVote(objectId: string) {
        const votesAndHide = this.getItemFromSessionStorage(objectId);
        const options = votesAndHide.split('__');
        this.setItemInSessionStorage(objectId, `${parseInt(options[0]) + 1}__${options[1]}`);
    }

    public hideStory(objectId: string) {
        const votesAndHide = this.getItemFromSessionStorage(objectId);
        const options = votesAndHide.split('__');
        this.setItemInSessionStorage(objectId, `${parseInt(options[0])}__0`);
    }

    public isPostVisible(objectId: string): number {
        const votesAndHide = this.getItemFromSessionStorage(objectId);
        return parseInt(votesAndHide.split('__')[1]);
    }

    public storeInStorageAccount(posts: IPosts[]) {

    }

}
