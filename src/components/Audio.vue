<template>
  <div class="Audio btn-group-container">
    <div class="btn-group btn-group" role="group" aria-label="Basic example">
      <div class="Audio-ListenIcon input-group-text" id="btnGroupAddon">
        <font-awesome-icon icon="fa-solid fa-circle-play" />
      </div>
      <button 
        @click="playMunster"
        type="button" class="Audio-Btn btn btn-outline-secondary">{{dictionary.AudioMunster.ga}}</button>
      <button 
        @click="playConnaght"
        type="button" class="Audio-Btn btn btn-outline-secondary">{{dictionary.AudioConnacht.ga}}</button>
      <button 
        @click="playUlster"
        type="button" class="Audio-Btn btn btn-outline-secondary">{{dictionary.AudioUlster.ga}}</button>
        <audio
          id="munsterAudio"
          preload="auto"
          src="./Ciarrai_Leathanach_13c.mp3"
        ></audio>
    </div>
  </div>   
</template>

<script>
import uladhAudioFile from '../assets/Litreach-Leathanach13.mp3';
import connAudioFile from '../assets/Litreach-Connacht-Leathanach13.mp3';
import ciarraiAudioFile from '../assets/Ciarrai_Leathanach_13c.mp3';
import { dictionary } from '../dictionary';

export default {
  props: {
    startTime: String,
    duration: String,
    uladhStartTime: String,
    uladhDuration: String,
    connStartTime: String,
    connDuration: String,
    kStartTime: String,
    kDuration: String,
    file: String

  },
  data() {
    return {
      audioPlayer: undefined,
      dictionary: dictionary,
      ulsterSoundFile: '../assets/Litreach-Leathanach13.mp3'
    }
  },
  methods: {
    urlWithTimeRange(fileName ){
      return fileName + "#t=" + this.startTime + ',' + this.endTime
    },
    durationAsMilliseconds(d) {
      let minutes = parseFloat(d.substring(0, d.indexOf(':')));
      let seconds = parseFloat(d.substring(d.indexOf(':') + 1, d.indexOf('.')));
      let milliseconds = parseFloat(d.slice(-3));
      return ((minutes * 60) * 1000) + (seconds * 1000) + milliseconds;
    },
    startTimeSecsMillisecs(startTime) {
      let minutes = parseFloat(startTime.substring(0, startTime.indexOf(':')));
      let seconds = parseFloat(startTime.substring(startTime.indexOf(':') + 1, startTime.length));
      return (minutes * 60 ) + seconds;
    },
    playMunster() {
      let startTime = this.startTimeSecsMillisecs(this.kStartTime);
      let duration = this.durationAsMilliseconds(this.kDuration) / 1000;
      (async () => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        // Using a different file because biblicaltext.com
        // doesn't allow cross-origin requests
        const data_buf = await fetch("./Ciarrai_Leathanach_13c.mp3")
          .then( resp => resp.arrayBuffer());
        const audio_buf = await ctx.decodeAudioData(data_buf);
        const source = ctx.createBufferSource();
        source.buffer = audio_buf;
        source.connect(ctx.destination);
        source.start(0, startTime, duration);
      })(startTime, duration);


     /* let audioPlayer = new Audio(this.urlWithTimeRange(ciarraiAudioFile));
      let durationMilliseconds = this.durationAsMilliseconds(this.kDuration);
      audioPlayer.currentTime = this.startTimeSecsMillisecs(this.kStartTime);
      let endTime = audioPlayer.currentTime + (durationMilliseconds / 1000);
      audioPlayer.play();
      setInterval(function(){
        if(audioPlayer.currentTime  > (durationMilliseconds / 1000)){
          
          audioPlayer.pause();
        }
      }, durationMilliseconds); */
    },
    playConnaght() {
      let audioPlayer = new Audio(this.urlWithTimeRange(connAudioFile));
      let durationMilliseconds = this.durationAsMilliseconds(this.connDuration);
      audioPlayer.currentTime = this.startTimeSecsMillisecs(this.connStartTime);
      audioPlayer.play();

      setInterval(function(){
        
        if(audioPlayer.currentTime > (durationMilliseconds / 1000)){
          
          audioPlayer.pause();
        }
      }, durationMilliseconds);
    },
    playUlster() {
      let audioPlayer = new Audio(this.urlWithTimeRange(uladhAudioFile));
      let durationMilliseconds = this.durationAsMilliseconds(this.uladhDuration);
      audioPlayer.currentTime = this.startTimeSecsMillisecs(this.uladhStartTime);
      audioPlayer.play();
      setInterval(function(){
        
        if(audioPlayer.currentTime > (durationMilliseconds / 1000)){
          
          audioPlayer.pause();
        }
      }, durationMilliseconds);
    },
    playAudio() {
      let audioPlayer = new Audio(this.urlWithTimeRange);
      let durationMilliseconds = this.durationAsMilliseconds;
      audioPlayer.currentTime = this.startTimeSecsMillisecs;
      audioPlayer.play();
      setInterval(function(){
        
        if(audioPlayer.currentTime > (durationMilliseconds / 1000)){
          
          audioPlayer.pause();
        }
      }, durationMilliseconds);
    }
  }
}
</script>
<style lang="scss" scoped>

  @import "../assets/breakpoints.scss";
  @import "../assets/variables.scss";
  .Audio {

    margin-left: .5rem;

    max-width: 100vw;
    overflow-x: scroll;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar { 
      display: none;  /* Safari and Chrome */
    }

    .Audio-Btn {
      white-space: nowrap;
    }

    &-ListenIcon {
      border-radius: 0;
      border-top-left-radius: 0.375rem;
      border-bottom-left-radius: 0.375rem;
    }

  }

  @media (prefers-color-scheme: dark) {

    .Audio-ListenIcon {
      color: $vt-c-text-dark-2;
    }

    .Audio-ListenIcon,
    .Audio-Btn {
      background-color: $vt-c-indigo;
      border: 1px solid $vt-c-black-mute;
    }   

}
</style>