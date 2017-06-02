import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';
import { Post } from '../models/post.model';

@Injectable()
export class PostService {
  route: string = 'posts';

  constructor(
    private apiService: ApiService
  ) {}

  getPosts(id: any = '', query: any = {}): Observable<any> {
    return this.apiService
      .get(`${this.route}/${id}`, query);
  }

  createPost(post: Post): Observable<any> {
    return this.apiService
      .post(this.route, post);
  }

  updatePost(postId: number, post: Post): Observable<any> {
    return this.apiService
      .put(`${this.route}/${postId}`, post);
  }

  deletePost(postId: number): Observable<any> {
    return this.apiService
      .delete(`${this.route}/${postId}`);
  }
}
