<script>
import Letter from '../components/GameLetter.vue'

export default {
  props: {
    answer: String,
    puzzlePosition: Object,
    currentGuess: String,
    boardState: Array,
    todaysAnswer: String,
    currentRound: Number,
    incorrectGuessRow: Number
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
    Letter
  },
  methods: {
    getLetter(row, position) {
      if (this.boardState && this.boardState[row][position]) {
        return this.boardState[row][position];
      } else if (row === this.puzzlePosition.row && this.currentGuess && this.currentGuess.charAt(position)){
        return this.currentGuess.charAt(position);
      } else {
        return ""
      }
    },
    letterStatus(row, position) {
      if (this.boardState[row].charAt(position) === this.todaysAnswer.charAt(position)) {
        return 'correctLetter';
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
    <div class="gameContainer">
          <ul class="answer-row">
            <Letter 
              data-row=0
              :puzzle-position="puzzlePosition"         
              v-for="(letter, index) in answer"
              :data-position="index"
              :letter="getLetter(0, index)"
              :class="[letterStatus(0, index), wrongAnswer(0, index)]"
              :answer-length="answerLength"
              >{{ letter }}</Letter>
          </ul>
          <ul class="answer-row"> 
            <Letter 
              data-row=1
              :puzzle-position="puzzlePosition" 
              v-for="(letter, index) in answer"
              :letter="getLetter(1, index)"
              :data-position="index"
              :class="[letterStatus(1, index), wrongAnswer(1, index)]"
              :answer-length="answerLength"
              >{{ letter }}</Letter>
          </ul>
          <ul class="answer-row">
            <Letter 
              data-row=2
              :puzzle-position="puzzlePosition" 
              v-for="(letter, index) in answer"
              :letter="getLetter(2, index)"
              :data-position="index"
              :class="[letterStatus(2, index), wrongAnswer(2, index)]"
              :answer-length="answerLength"
              >{{ letter }}</Letter>
          </ul>
          <ul class="answer-row">
            <Letter 
              data-row=3
              :puzzle-position="puzzlePosition" 
              v-for="(letter, index) in answer"
              :letter="getLetter(3, index)"
              :data-position="index"
              :class="[letterStatus(3, index), wrongAnswer(3, index)]"
              :answer-length="answerLength"
              >{{ letter }}</Letter>
          </ul>
          <ul class="answer-row">
            <Letter 
              data-row=4
              :puzzle-position="puzzlePosition" 
              v-for="(letter, index) in answer"
              :letter="getLetter(4, index)"
              :data-position="index"
              :class="[letterStatus(4, index), wrongAnswer(4, index)]"
              :answer-length="answerLength"
              >{{ letter }}</Letter>
          </ul>
          <div class="btn-group-container">
            <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-outline-secondary">Mumhan</button>
              <button type="button" class="btn btn-outline-secondary">Connacht</button>
              <button type="button" class="btn btn-outline-secondary">Uladh</button>
            </div>
          </div>    
        </div>
</template>
<style scoped lang="scss">

  @import "../assets/variables.scss";

  .gameContainer {
      position: absolute;
      top: 26%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -27%);
  }

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

</style>