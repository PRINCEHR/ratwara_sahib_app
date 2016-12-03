import { Component, PipeTransform, Pipe } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../providers/auth/auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalVariable } from '../../globals';

/*
  Generated class for the AdminPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage {
  url: string = 'https://api.ionic.io/push/notifications?page_size=5&page=1';
  urlPush: string = 'https://api.ionic.io/push/notifications?send_to_all=true';
  notifications: any = [];
  title: string = '';
  message: string = '';
  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService, public http: Http) { }

  ionViewDidLoad() {
    console.log('Hello AdminPage Page');
  }
  closeMenu() {
    this.menu.close();
    console.log("Close page event admin page")
    this.navCtrl.setRoot(TabsPage);
  }
  ionViewWillEnter() {
    this.listNotifications();
  }
  listNotifications() {
    console.log("Notifications here");
    var token = GlobalVariable.PUSH_TOKEN;
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append('Authorization', `Bearer ${token}`);
    let options = new RequestOptions({ headers: headers });
    this.http.get(this.url, options).map(res => res.json()).subscribe(data => {
      console.log("Notifications::  ", data.data);
      this.notifications = data.data;
    });
  }
  sendNotifications() {
    console.log(this.title);
    console.log(this.message);
    let notify = JSON.stringify({
      "profile": "prod",
      "notification": {
        title: this.title, message: this.message
      }
    });
    var token = GlobalVariable.PUSH_TOKEN;
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append("Content-Type", 'application/json');
    headers.append('Authorization', `Bearer ${token}`);
    let options = new RequestOptions({ headers: headers });
    this.http.post(this.urlPush, notify, options).subscribe(
      data => {
        console.log('After push ', data);
        this.title='';
         this.message='';
      },
      err => (err.json().message),
      () => {
        console.log('Notification Send')
        this.listNotifications();
      }
    );
  }
}

