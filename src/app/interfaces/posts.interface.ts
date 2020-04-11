export interface IPostsHits {
    hits: IPosts[];
}

export interface IPosts {
    created_at: string;
    title: string;
    url: string;
    author: string;
    points: number;
    story_text?: any;
    comment_text?: any;
    num_comments: number;
    story_id?: any;
    story_title?: any;
    story_url?: any;
    parent_id?: any;
    created_at_i: number;
    _tags: string[];
    objectID: string;
    _highlightResult: IHighlightResult;
}

export interface IHighlightResult {
    title: Title;
    url: Title;
    author: Title;
}

export interface Title {
    value: string;
    matchLevel: string;
    matchedWords: any[];
}
