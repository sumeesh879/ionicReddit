import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RedditService } from '../../app/services/reddit.service';
import { DetailsPage } from '../details/details';

/*
  Generated class for the Reddits page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reddits',
  templateUrl: 'reddits.html'
})
export class RedditsPage implements OnInit{

  listings: any;
  category: String;
  limit: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private redditService: RedditService) {
                
                this.getDefaults();

  }

  getPosts(category, limit) {
    this.redditService.getPosts(category, limit).subscribe(res => {
      this.listings = res.data.children;
      console.log(this.listings);
    })
  }

  ngOnInit() {
    this.getPosts(this.category, this.limit);
  }

  viewItem(item) {
    this.navCtrl.push(DetailsPage, {
      item: item
    });
  }

  getDefaults() {
    if(localStorage.getItem('category') != null) {
      this.category = localStorage.getItem('category');
    } else {
      this.category = 'sports';
    }
    if(localStorage.getItem('limit') != null) {
      this.limit = localStorage.getItem('limit');
    } else {
      this.limit = 10;
    }
  }

  changeList() {
    this.getPosts(this.category, this.limit);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RedditsPage');
  }

}
