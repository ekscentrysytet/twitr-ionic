import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { PostService } from '../../shared';
import { PostDetailsPage } from '../post-details/post-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts: Observable<any>;
  errors: Object = {};

  constructor(
    public navCtrl: NavController,
    private postService: PostService
  ) {}

  ionViewDidLoad() {
    this.posts = this.postService
      .getPosts()
      .map(data => data.posts);
  }

  goToPost(postId: number) {
    this.navCtrl.push(PostDetailsPage, { postId });
  }
}
