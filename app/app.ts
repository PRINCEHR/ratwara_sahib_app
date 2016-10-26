import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {HomePage} from './pages/home/home';
import {YoutubeService} from './providers/youtube-service/youtube-service';
import {YoutubeServiceLive} from './providers/youtube-service-live/youtube-service-live';


import {AudioProvider, WebAudioProvider} from 'ionic-audio/dist/ionic-audio';
// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type, provide} from '@angular/core';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    this.rootPage = TabsPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      StatusBar.styleDefault();
    });
  }
   stopVideo(): void{
    console.log("Call function to stop video");
    
  }
}

ionicBootstrap(MyApp, [provide(AudioProvider,  { useFactory: AudioProvider.factory })]);