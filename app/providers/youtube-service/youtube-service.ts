import { Http, URLSearchParams, Response } from '@angular/http';
import { Injectable, NgZone } from '@angular/core';
import { window } from '@angular/platform-browser/src/facade/browser';
/*
  Generated class for the YoutubeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class YoutubeService {
  youtube: any = {
    ready: false,
    player: null,
    playerId: null,
    videoId: null,
    videoTitle: null,
    playerHeight: '100%',
    playerWidth: '100%',
    isPlaying:false
  }


  constructor () {
     var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.YT =undefined;
      this.setupPlayer();
  }

  bindPlayer(elementId): void {
    this.youtube.playerId = elementId;
  };

  createPlayer(): void {
    console.log("create player now")

    if (this.youtube.ready && this.youtube.playerId) {
      if (this.youtube.player) {
      this.youtube.player.destroy();
      }
      this.youtube.player= new window.YT.Player(this.youtube.playerId, {
      height: this.youtube.playerHeight,
      width: this.youtube.playerWidth,
      playerVars: {
        rel: 0,
        showinfo: 0
      },
      events: {
            'onReady': this.onPlayerReady
          }
    });   
    }
    
    
  }

onPlayerReady():void{
  console.log("player ready evt");
}
    setupPlayer () {
    // in production mode, the youtube iframe api script tag is loaded
    // before the bundle.js, so the 'onYouTubeIfarmeAPIReady' has
    // already been triggered
    // TODO: handle this in build or in nicer in code
    console.log ("Running Setup Player");

    window['onYouTubeIframeAPIReady'] = () => {
      if (window['YT']) {
         console.log('Youtube API is ready 123');
         this.youtube.ready = true;
         this.bindPlayer('placeholder');
         this.createPlayer();
      }
    };
    if (window.YT && window.YT.Player) {
            console.log('Youtube API is ready 456');
         this.youtube.ready = true;
         this.bindPlayer('placeholder');
         this.createPlayer();
    }

  }

  launchPlayer(id, title):void {
    this.youtube.player.loadVideoById(id);
    this.youtube.videoId = id;
    this.youtube.videoTitle = title;
    this.youtube.isPlaying=true;

    return this.youtube;
  }
  pausePlayer():void{
    if(this.youtube.isPlaying){
        this.youtube.player.pauseVideo();
    }
  }
}

