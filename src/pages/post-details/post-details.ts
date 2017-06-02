import { Component } from '@angular/core';
import {
  NavController,
  NavParams
} from 'ionic-angular';

import { PostService } from '../../shared';

@Component({
  selector: 'page-post-details',
  templateUrl: 'post-details.html'
})
export class PostDetailsPage {
  post: Object = {};
  errors: Object = {};

  constructor(
    public navCtrl: NavController,
    private postService: PostService,
    private navParams: NavParams
  ) {}

  ionViewWillEnter() {
    const postId = this.navParams.get('postId');
    this.postService.getPosts(postId)
      .subscribe(
        data => {
          this.post = data.post;
        },
        err => this.errors = err
      );
  }
}
