<script>
import Letter from '../components/GameLetter.vue'
import Audio from '../components/Audio.vue'

export default {
  props: {
    answer: String,
    puzzlePosition: Object,
    currentGuess: String,
    boardState: Array,
    todaysAnswer: String,
    currentRound: Number,
    incorrectGuessRow: Number,
    startTime: String,
    duration: String,
    uladhStartTime: String,
    uladhDuration: String,
    connStartTime: String,
    connDuration: String,
    kStartTime: String,
    kDuration: String,
    file: String,
    definition: String,
    tileTimeouts: Boolean
  },
  data(){
    return {}
  },
  watch: {
    currentGuess: function() {
      this.$forceUpdate();
    },
    currentRound: function() {
      this.$forceUpdate();
    }
  },
  computed: {
    answerLength() {
      return this.answer.length
    }
  },
  components: {
    Letter,
    Audio
  },
  methods: {
    animationDelay(index) {
      return  (index * 250) + "ms";
    },
    getLetter(row, position) {
      if (this.boardState && this.boardState[row][position]) {
        return this.boardState[row][position];
      } else if (row === this.puzzlePosition.row && this.currentGuess && this.currentGuess.charAt(position)){
        return this.currentGuess.charAt(position);
      } else {
        return ""
      }
    },
    letterDelay(row, position) {

    },
    letterStatus(row, position) {
      if (this.boardState[row].charAt(position) === this.todaysAnswer.charAt(position)) {
        return 'correctLetter';
      } else if (this.boardState[row].charAt(position).length > 0) {
        return 'incorrectLetter';
      }
    },
    wrongAnswer(row, position) {
      if(this.incorrectGuessRow && this.incorrectGuessRow === row)  {
        return 'shake';
      }  
    }
  }
}
</script>

<template>
    <div class="gameContainer GameArea">
      <div>
        <ul class="answer-row">
            <Letter 
              data-row=0
              :puzzle-position="puzzlePosition"         
              v-for="(letter, index) in answer"
              :data-position="index"
              :letter="getLetter(0, index)"
              :style="[]"
              :class="[letterStatus(0, index), wrongAnswer(0, index)]"
              :answer-length="answerLength"
              :animation-delay="tileTimeouts ? animationDelay(index) : ''"
              >{{ letter }}</Letter>
          </ul>
          <ul class="answer-row"> 
            <Letter 
              data-row=1
              :puzzle-position="puzzlePosition" 
              v-for="(letter, index) in answer"
              :letter="getLetter(1, index)"
              :data-position="index"
              :style="[]"
              :class="[letterStatus(1, index), wrongAnswer(1, index)]"
              :answer-length="answerLength"
              :animation-delay="tileTimeouts ? animationDelay(index) : ''"
              >{{ letter }}</Letter>
          </ul>
          <ul class="answer-row">
            <Letter 
              data-row=2
              :puzzle-position="puzzlePosition" 
              v-for="(letter, index) in answer"
              :letter="getLetter(2, index)"
              :data-position="index"
              :style="[]"
              :class="[letterStatus(2, index), wrongAnswer(2, index)]"
              :answer-length="answerLength"
              :animation-delay="tileTimeouts ? animationDelay(index) : ''"
              >{{ letter }}</Letter>
          </ul>
          <ul class="answer-row">
            <Letter 
              data-row=3
              :puzzle-position="puzzlePosition" 
              v-for="(letter, index) in answer"
              :letter="getLetter(3, index)"
              :style="[]"
              :data-position="index"
              :class="[letterStatus(3, index), wrongAnswer(3, index)]"
              :answer-length="answerLength"
              :animation-delay="tileTimeouts ? animationDelay(index) : ''"
              >{{ letter }}</Letter>
          </ul>
          <ul class="answer-row">
            <Letter 
              data-row=4
              :puzzle-position="puzzlePosition" 
              v-for="(letter, index) in answer"
              :letter="getLetter(4, index)"
              :data-position="index"
              :style="[]"
              :class="[letterStatus(4, index), wrongAnswer(4, index)]"
              :answer-length="answerLength"
              :animation-delay="animationDelay(index)"
              >{{ letter }}</Letter>
          </ul> 
      </div>          
      <Audio 
        v-if="this.currentRound < 5"
        :uladh-start-time="uladhStartTime"
        :uladh-duration="uladhDuration"
        :conn-start-time="connStartTime"
        :conn-duration="connDuration"
        :k-start-time="kStartTime"
        :k-duration="kDuration"
        :start-time="startTime"
        :duration="duration"
        :definition="definition"
        :file="'./Litreach-Leachtanch13.mp3'"
      />
  </div>
</template>
<style scoped lang="scss">

  @import "../assets/variables.scss";
  @import "../assets/breakpoints.scss";

 /* .gameContainer {
      position: absolute;
      top: 26%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -27%);
  }*/

  ul.answer-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 2px !important;
    padding-left: 0 !important;
  }

.btn-group-container {
    text-align: center;
}



@media (prefers-color-scheme: dark) {

  .letter {
    background-color: $vt-c-black-soft;
    border: 1px solid $vt-c-black-mute;
  }

}

@media (min-height: $height-breakpoint-667) {
 /* .gameContainer {
    transform: translate(-50%, -32%);
  }*/
}



</style>