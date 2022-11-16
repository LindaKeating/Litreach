<script >
  import Nav from './components/Nav.vue'
  import Keyboard from './components/Keyboard.vue'
  import GameArea from './components/GameArea.vue'
  import Modal from './components/Modal.vue'
  import GameRoundEnded from './components/GameRoundEnded.vue'

  let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let todaysPuzzle = ['tabhair', 'bringloid', 'fosta', 'amharc', 'dalba'];

  let initialPuzzleState = {
    puzzlePosition: {
      row: 0,
      position: 0
    },
    boardState: ['', '', '', '', ''],
    todaysAttempts: [{}, {}, {}, {} , {}],
    currentRound: 0
  }

  // check first if the state is in local storage, use that, if not use the object defined above
  let puzzleState = localStorage.getItem("puzzleState") ? JSON.parse(localStorage.getItem("puzzleState")) : initialPuzzleState;

  
  /*
  if (!localStorage.getItem("puzzleState")) {
    localStorage.setItem("puzzleState", JSON.stringify(puzzleState));
  }*/

  export default {
    data() {
      return {
        data: {
          darkMode: darkMode,
          todaysPuzzle: todaysPuzzle,
          currentGuess: '',
          puzzlePosition: puzzleState.puzzlePosition,
          boardState: puzzleState.boardState,
          modalOpen: false,
          todaysAttempts: puzzleState.todaysAttempts,
          currentRound: puzzleState.currentRound
        }        
      }
    },
    methods: {
      updateCurrentGuess (letter) {
        let currentRound = this.data.currentRound;
        if (this.data.currentGuess.length < this.data.todaysPuzzle[currentRound].length) {
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
        let currentRound = this.data.currentRound;
        // right answer submitted
        if (this.data.currentGuess.toLowerCase() === this.data.todaysPuzzle[currentRound].toLowerCase()){
          // commit attempt to local storage
          this.updateTodaysAttemptsRecord();
          this.setNextRoundPuzzlePosition();
          this.data.currentGuess = "";
          this.data.boardState = ["", "", "", "", ""]
          this.moveToNextRound();
          this.updateLocalStoragePuzzleState();
          return this.data.modalOpen = true;
          // are the more words in todays game?
          // set up next word
          // show congrats screen
        } else {
          // TODO: show toast this is not the write word
          // TODO: colour the letters that are right
          console.log('the two words are not the same');
          this.data.boardState[this.data.puzzlePosition.row] = this.data.currentGuess;
          this.data.currentGuess = "";
          this.updatePuzzlePosition();
          //this.moveToNextRound();
          this.updateLocalStoragePuzzleState();
          //return this.data.modalOpen = true; */
        }

      },
      moveToNextRound() {
        this.data.currentRound += 1;
      },
      setNextRoundPuzzlePosition() {
        this.data.puzzlePosition.position = 0;
        this.data.puzzlePosition.row = 0;
      },
      updatePuzzlePosition() {
        let currentRound = this.data.currentRound;
        if (this.data.puzzlePosition.position < this.data.todaysPuzzle[currentRound].length) {
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
      },
      updateLocalStoragePuzzleState() {
        let puzzleState = {
          'puzzlePosition': this.data.puzzlePosition,
          'boardState': this.data.boardState,
          'todaysAttempts': this.data.todaysAttempts,
          'currentRound': this.data.currentRound
        }
        localStorage.setItem("puzzleState", JSON.stringify(puzzleState))
      },
      setNextRowPuzzlePosition() {
        if (this.data.puzzlePosition.row < 4) {
          this.data.puzzlePosition.row = this.data.puzzlePosition.row + 1;
          this.data.puzzlePosition.position = 0;
        } else {
          // no more guess attempts 
          // either move to next word in todays game or set game over
        }
      },
      openModal() {
        console.log('open Modal method fired');
        return this.data.modalOpen = !this.data.modalOpen
      },
      updateTodaysAttemptsRecord() {
        this.data.todaysAttempts[this.data.currentRound] = {
          answer: this.data.todaysPuzzle[this.data.currentRound],
          attempts: this.data.puzzlePosition.row
        }
      }
     },
    components: {
      Nav,
      Keyboard,
      GameArea,
      Modal,
      GameRoundEnded
    }
  }
</script>

<template>
  <Modal 
    @modalOpenState="openModal" 
    :modalOpen="data.modalOpen"

    :class="data.modalOpen ? 'show' : ''">
    <GameRoundEnded 
      :todaysAttempts="data.todaysAttempts"
      :boardState="data.boardState"/>
  </Modal>
  <button class="btn" @click="openModal">Open Modal</button>
  <Nav :data="data"/>
  <GameArea
    :board-state="data.boardState"
    :puzzlePosition="data.puzzlePosition"
    :currentGuess="data.currentGuess"
    :answer="data.todaysPuzzle[data.currentRound]"
    :todaysAnswer="data.todaysPuzzle[data.currentRound]" 
    :currentRound="data.currentRound"/> 
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
