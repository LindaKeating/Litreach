<script >
  import Nav from './components/Nav.vue'
  import Keyboard from './components/Keyboard.vue'
  import GameArea from './components/GameArea.vue'

  let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let todaysPuzzle = 'tabhair'


  export default {
    data() {
      return {
        data: {
          count: 0,
          darkMode: darkMode,
          todaysPuzzle: todaysPuzzle,
          currentGuess: '',
          puzzlePosition: {
            row: 4,
            position: 0,
          },
          boardState: ["theatre", "guardia", "friends", "monkeys", ""]
        }        
      }
    },
    methods: {
      updateCurrentGuess (letter) {
        if (this.data.currentGuess.length < this.data.todaysPuzzle.length) {
          this.data.currentGuess = this.data.currentGuess.concat(letter);
          this.updatePuzzlePosition();
        } 
      },
      backspaceCurrentGuess() {
        if(this.data.currentGuess.length > 0) {
          this.data.currentGuess = this.data.currentGuess.slice(0, -1);
          this.decreasePuzzlePosition();
        }
      },
      submitWordAttempt() {
        console.log('submit word attempt')
      },
      updatePuzzlePosition() {
        if (this.data.puzzlePosition.position < this.data.todaysPuzzle.length) {
          return this.data.puzzlePosition.position += 1;
        } else {
          this.data.puzzlePosition.position = 0;
          return this.data.puzzlePosition.row += 1;
        }
      },
      decreasePuzzlePosition() {
        if(this.data.puzzlePosition.position > 0) {
          this.data.puzzlePosition.position = this.data.puzzlePosition.position - 1;
        }
      }
     },
    components: {
      Nav,
      Keyboard,
      GameArea
    }
  }
  

</script>

<template>
  <Nav :data="data"/>
  <GameArea
    :board-state="data.boardState"
    :puzzlePosition="data.puzzlePosition"
    :currentGuess="data.currentGuess"
    :answer="['t','a','b','h', 'a', 'i', 'r']"/> 
  <Keyboard 
    @deleteLastLetter="backspaceCurrentGuess"
    @addLetterToBoard="updateCurrentGuess"
    @submitWordAttempt="submitWordAttempt"
    :darkMode="data"
  />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
