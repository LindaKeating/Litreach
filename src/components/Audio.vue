<template>
  <div class="Audio btn-group-container">
    <div class="btn-group btn-group-md" role="group" aria-label="Basic example">
      <div class="Audio-ListenIcon input-group-text" id="btnGroupAddon">
        <font-awesome-icon icon="fa-solid fa-circle-play" />
      </div>
      <button 
        @click="playAudio"
        type="button" class="Audio-Btn btn btn-outline-secondary">Mumhan</button>
      <button 
        @click="playAudio"
        type="button" class="Audio-Btn btn btn-outline-secondary">Connacht</button>
      <button 
        @click="playAudio"
        type="button" class="Audio-Btn btn btn-outline-secondary">Uladh</button>
    </div>
  </div>   
</template>

<script>
import audioFile from '../assets/Litreach-Leathanach13.mp3';
export default {
  props: {
    startTime: String,
    duration: String,
    file: String
  },
  data() {
    return {
      audioPlayer: undefined
    }
  },
  computed: {
    urlWithTimeRange() {
      return audioFile + "#t=" + this.startTime + ',' + this.endTime
    },
    startTimeSecsMillisecs() {
      let minutes = parseFloat(this.startTime.substring(0, this.startTime.indexOf(':')));
      let seconds = parseFloat(this.startTime.substring(this.startTime.indexOf(':') + 1, this.startTime.length));
      return (minutes * 60 ) + seconds;
    },
    durationAsMilliseconds() {
      let minutes = parseFloat(this.duration.substring(0, this.duration.indexOf(':')));
      let seconds = parseFloat(this.duration.substring(this.duration.indexOf(':') + 1, this.duration.indexOf('.')));
      let milliseconds = parseFloat(this.duration.slice(-3));
      return ((minutes * 60) * 1000) + (seconds * 1000) + milliseconds;
    }
  },
  methods: {
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