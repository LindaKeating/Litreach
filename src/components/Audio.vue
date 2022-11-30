<template>
  <div class="btn-group-container">
    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
      <button 
        @click="playAudio"
        type="button" class="btn btn-outline-secondary">Mumhan</button>
      <button 
        @click="playAudio"
        type="button" class="btn btn-outline-secondary">Connacht</button>
      <button 
        @click="playAudio"
        type="button" class="btn btn-outline-secondary">Uladh</button>
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