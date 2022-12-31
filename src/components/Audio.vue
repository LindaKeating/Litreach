<template>
  <div class="Audio btn-group-container margin-top">
    <div class="Audio-SoundButtons">
      <div class="btn-group btn-group" role="group" aria-label="Basic example">
      <button 
        @click="playUlster"
        type="button" class="Audio-Btn btn btn-outline-secondary btn-lg ">
        <font-awesome-icon icon="fa-solid fa-waveform-lines" />
        {{dictionary.AudioUlster.ga}} 
      </button>
      <button 
        @click="playConnaght"
        type="button" class="Audio-Btn btn btn-outline-secondary btn-lg ">
        <font-awesome-icon icon="fa-solid fa-waveform-lines" />
        {{dictionary.AudioConnacht.ga}}</button>
      <button 
        @click="playMunster"
        type="button" class="Audio-Btn btn btn-outline-secondary btn-lg ">
        <font-awesome-icon icon="fa-solid fa-waveform-lines" />
        {{dictionary.AudioMunster.ga}}</button>
    </div>
    </div>
    
    <div class="btn-group margin-top" >
      <button 
        @click="togglePlayBackSpeed()"
        :class="!this.playBackSpeedNormal ? 'active': ''"
        class="btn btn-outline-secondary btn-sm"><font-awesome-icon icon="fa-solid fa-gauge-low" /> 0.85x </button>
      <button 
        @click="togglePlayBackSpeed()"
        :class="this.playBackSpeedNormal ? 'active': ''"
        class="btn btn-outline-secondary btn-sm"><font-awesome-icon icon="fa-solid fa-gauge" /> Gnáthluas</button>
      <Popper arrow placement="top" :content="definition">
        <button class="btn btn-outline-secondary Audio-HintButton">
          <font-awesome-icon icon="fa-solid fa-lightbulb-exclamation-on" />
          Sainmhíniú
        </button>
      </Popper>
    </div>
  </div>   
</template>

<script>
import { dictionary } from '../dictionary';
import * as Tone from 'tone';
import { ToneWithContext } from 'tone/build/esm/core/context/ToneWithContext';

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
      playBackSpeedNormal: true
    }
  },
  methods: {
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
    startTimeSecsMillisecs(startTime) {
      let minutes = parseFloat(startTime.substring(0, startTime.indexOf(':')));
      let seconds = parseFloat(startTime.substring(startTime.indexOf(':') + 1, startTime.length));
      return (minutes * 60 ) + seconds;
    },
    playMunster() {
      let startTime = this.startTimeSecsMillisecs(this.kStartTime);
      let duration = this.durationAsMilliseconds(this.kDuration) / 1000;
      const shift = new Tone.PitchShift().toDestination();
      const source = new Tone.Player(this.munsterAudioBuff).connect(shift);
      source.playbackRate = this.playBackSpeedNormal ? 1 : 0.70710678;
      this.playBackSpeedNormal ? shift.pitch = 0 : shift.pitch = 6;
      source.start(0, startTime, duration)
    },
    playConnaght() {
      let startTime = this.startTimeSecsMillisecs(this.connStartTime);
      let duration = this.durationAsMilliseconds(this.connDuration) / 1000;
      const shift = new Tone.PitchShift().toDestination();
      const source = new Tone.Player(this.connaughtAudioBuff).connect(shift);
      source.playbackRate = this.playBackSpeedNormal ? 1 : 0.70710678;
      this.playBackSpeedNormal ? shift.pitch = 0 : shift.pitch = 6;
      source.start(0, startTime, duration);
    },
    playUlster() {
      let startTime = this.startTimeSecsMillisecs(this.uladhStartTime);
      let duration = this.durationAsMilliseconds(this.uladhDuration) / 1000;
      const shiftPitch = this.playBackSpeedNormal ? 0 : 6;
      const shift = new Tone.PitchShift({pitch: shiftPitch}).toDestination();
      let source = new Tone.Player(this.ulsterAudioBuff);
      source.playbackRate = this.playBackSpeedNormal ? 1 : 0.70710678;
      source.disconnect();
      source.connect(shift);
      source.start(0, startTime, duration);
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
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      color: $stars-light-mode;
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