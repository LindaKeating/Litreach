<template>
  <div class="Audio btn-group-container margin-top">
    <div class="Audio-SoundButtons">
      <div class="btn-group btn-group" role="group" aria-label="Basic example">
      <button 
        title="Éist leis an leagan Ultach"
        @click="playUlster"
        type="button" class="Audio-Btn btn btn-outline-secondary btn-lg ">
        <font-awesome-icon icon="fa-solid fa-waveform-lines" />
        {{dictionary.AudioUlster.ga}} 
      </button>
      <button 
        title="Éist leis an leagan Chonnachtach"
        @click="playConnaght"
        type="button" class="Audio-Btn btn btn-outline-secondary btn-lg ">
        <font-awesome-icon icon="fa-solid fa-waveform-lines" />
        {{dictionary.AudioConnacht.ga}}</button>
      <button 
        title="Éist leis an leagan Mhuimhneach"
        @click="playMunster"
        type="button" class="Audio-Btn btn btn-outline-secondary btn-lg ">
        <font-awesome-icon icon="fa-solid fa-waveform-lines" />
        {{dictionary.AudioMunster.ga}}</button>
    </div>
    </div>
    
    <div class="margin-top" >
      <Popper arrow placement="top" 
          :content="definition">
        <button 
          title="Féach ar shainmhíniú den fhocal"
          class="btn btn-outline-secondary Audio-HintButton"
          @click="togglePopper">
          <font-awesome-icon icon="fa-solid fa-lightbulb-exclamation-on" />
          Sainmhíniú
        </button>
      </Popper>
    </div>
  </div>   
</template>

<script>
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
    file: String,
    definition: String
  },
  data() {
    return {
      audioPlayer: undefined,
      dictionary: dictionary,
      munsterAudioContext: undefined,
      munsterAudioBuff: undefined,
      ulsterAudioContext: undefined,
      ulsterAudioBuff: undefined,
      connaughtAudioContext: undefined,
      connaughtAudioBuff: undefined,
      showPopper: true,
      playBackSpeedNormal: true,
      showPopper: false
    }
  },
  methods: {
    togglePopper() {
      return this.showPopper = !this.showPopper;
    },
    playWebAudioApi(startTime, duration, audioContext, buffer) {
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = this.playBackSpeedNormal ? 1 : .85;
      source.connect(audioContext.destination);
      source.start(0, startTime, duration);
    },
    playHtmlAudio(url, startTime, endTime) {
      const audio = new Audio(url + '#t=' + startTime + ',' + endTime);
      audio.playbackRate = .75;
      audio.play();
    },
    togglePlayBackSpeed() {
      return this.playBackSpeedNormal = !this.playBackSpeedNormal;
    },
    urlWithTimeRange(fileName ){
      return fileName + "#t=" + this.startTime + ',' + this.endTime
    },
    durationAsMilliseconds(d) {
      let minutes = parseFloat(d.substring(0, d.indexOf(':')));
      let seconds = parseFloat(d.substring(d.indexOf(':') + 1, d.indexOf('.')));
      let milliseconds = parseFloat(d.slice(-3));
      return ((minutes * 60) * 1000) + (seconds * 1000) + milliseconds;
    },
    endTimeSecsMillisecs(startTime, duration) {
      console.log((startTime + duration) - 0.1)
      return startTime + duration - 0.2;
    },
    startTimeSecsMillisecs(startTime) {
      let minutes = parseFloat(startTime.substring(0, startTime.indexOf(':')));
      let seconds = parseFloat(startTime.substring(startTime.indexOf(':') + 1, startTime.length));
      return (minutes * 60 ) + seconds;
    },
    playMunster() {
      let startTime = this.startTimeSecsMillisecs(this.kStartTime);
      let duration = this.durationAsMilliseconds(this.kDuration) / 1000;
      let endTime = this.endTimeSecsMillisecs(startTime, duration);
      this.playBackSpeedNormal ? this.playWebAudioApi(startTime, duration, this.munsterAudioContext, this.munsterAudioBuff) : this.playHtmlAudio('./Kerry-Leathanach1.mp3', startTime, endTime);;
    },
    playConnaght() {
      let startTime = this.startTimeSecsMillisecs(this.connStartTime);
      let duration = this.durationAsMilliseconds(this.connDuration) / 1000;
      let endTime = this.endTimeSecsMillisecs(startTime, duration);
      this.playBackSpeedNormal ? this.playWebAudioApi(startTime, duration, this.connaughtAudioContext, this.connaughtAudioBuff) : this.playHtmlAudio('./Connacht-Leathanach1.mp3', startTime, endTime);
    },
    playUlster() {
      let startTime = this.startTimeSecsMillisecs(this.uladhStartTime);
      let duration = this.durationAsMilliseconds(this.uladhDuration) / 1000;
      let endTime = this.endTimeSecsMillisecs(startTime, duration);
      this.playBackSpeedNormal ? this.playWebAudioApi(startTime, duration, this.ulsterAudioContext, this.ulsterAudioBuff) : this.playHtmlAudio('./Leathanach1-Normalised.mp3', startTime, endTime);
    }
  },
  mounted() {
 (async () => {
        this.munsterAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        const data_buf = await fetch("./Kerry-Leathanach1.mp3")
          .then( resp => resp.arrayBuffer());
        this.munsterAudioBuff = await this.munsterAudioContext.decodeAudioData(data_buf);
      })(this.munsterAudioContext, this.munsterAudioBuff);
 
    (async () => {
      this.connaughtAudioContext= new (window.AudioContext || window.webkitAudioContext)();
        const buffer = await fetch("./Connacht-Leathanach1.mp3")
          .then( resp => resp.arrayBuffer());
          this.connaughtAudioBuff = await this.connaughtAudioContext.decodeAudioData(buffer);
    })(this.connaughtAudioContext, this.connaughtAudioBuff);

    (async () => {
      this.ulsterAudioContext= new (window.AudioContext || window.webkitAudioContext)();
        const buffer = await fetch("./Leathanach1-Normalised.mp3")
          .then( resp => resp.arrayBuffer());
          this.ulsterAudioBuff = await this.ulsterAudioContext.decodeAudioData(buffer);
    })(this.ulsterAudioContext, this.ulsterAudioBuff);
  }
}
</script>
<style lang="scss" scoped>

  @import "../assets/breakpoints.scss";
  @import "../assets/variables.scss";
  .Audio {

    margin-left: .5rem;

    &-HintButton {
      
    }

    &-SoundButtons {
      max-width: 100vw;
      overflow-x: scroll;
      -ms-overflow-style: none;  /* Internet Explorer 10+ */
      scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar { 
      display: none;  /* Safari and Chrome */
    }
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

    .Audio-Btn {
      color: $stars-light-mode;
    }

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