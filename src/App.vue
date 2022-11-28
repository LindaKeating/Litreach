<script >
  import { answers } from  '../src/answers.js';
  import '../src/dates.js';

  import Nav from './components/Nav.vue'
  import Keyboard from './components/Keyboard.vue'
  import GameArea from './components/GameArea.vue'
  import Modal from './components/Modal.vue'
  import GameRoundEnded from './components/GameRoundEnded.vue'
  import GameDayEnded from './components/GameDayEnded.vue'
  import HowToPlay from './components/HowToPlay.vue'
  import Support from './components/Support.vue'

  let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let todaysDOY = new Date().getDOY();
  let todaysPuzzle = [answers[todaysDOY * 5], answers[(todaysDOY * 5) + 1], answers[(todaysDOY * 5) + 2], answers[(todaysDOY * 5) + 3], answers[(todaysDOY * 5) + 4]];

  let initialPuzzleState = {
    puzzlePosition: {
      row: 0,
      position: 0
    },
    boardState: ['', '', '', '', ''],
    todaysAttempts: [{}, {}, {}, {} , {}],
    currentRound: 0,
    statistics: {

    },
    gameEnded: false,
    lastPlayedDate: undefined
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
          modalOpen: true,
          currentModal: '',
          todaysAttempts: puzzleState.todaysAttempts,
          currentRound: puzzleState.currentRound,
          statistics: puzzleState.statistics,
          lastPlayedDate: puzzleState.lastPlayedDate
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
          this.moveToNextRound();
          this.updateStatistics();
          this.updateLocalStoragePuzzleState();
          return this.data.modalOpen = true;
        } else {
          this.data.boardState[this.data.puzzlePosition.row] = this.data.currentGuess;
          this.data.currentGuess = "";
          this.updatePuzzlePosition();
          if(this.data.puzzlePosition.row > 4) {
            this.updateStatistics();
            this.updateTodaysAttemptsRecord();
            this.moveToNextRound();
            this.data.modalOpen = true;
          }
          this.updateLocalStoragePuzzleState();
        }

      },
      moveToNextRound() {
        this.data.currentRound += 1;
        this.data.puzzlePosition.row = 0;
        this.data.puzzlePosition.position = 0;
        this.data.currentGuess = "";
        this.data.boardState = ["", "", "", "", ""]
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
          'currentRound': this.data.currentRound,
          'statistics': this.data.statistics,
          'lastPlayedDate': todaysDOY
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
        return this.data.modalOpen = !this.data.modalOpen;
      },
      setCurrentModal(modal) {
        this.data.modalOpen = !this.data.modalOpen;
        return this.data.currentModal = modal;
      },
      updateTodaysAttemptsRecord() {
        this.data.todaysAttempts[this.data.currentRound] = {
          answer: this.data.todaysPuzzle[this.data.currentRound],
          attempts: this.data.puzzlePosition.row
        }
      },
      updateStatistics() {
        let todaysDate = new Date().getDOY();
        this.data.statistics[todaysDOY] = this.data.todaysAttempts;
      }
     },
    components: {
      Nav,
      Keyboard,
      GameArea,
      Modal,
      GameRoundEnded,
      GameDayEnded,
      HowToPlay,
      Support
    },
    computed: {
      gameEnded() {
        return this.data.currentRound > 4 ? true : false;
      }
    },
    mounted() {
      if(!this.data.lastPlayedDate || this.data.lastPlayedDate !== todaysDOY) {
        this.data.boardState = initialPuzzleState.boardState;
        this.data.todaysAttempts = initialPuzzleState.todaysAttempts;
        this.data.currentRound = initialPuzzleState.currentRound;
        this.data.puzzlePosition = initialPuzzleState.puzzlePosition;
        this.data.gameEnded = false;
      }
      console.log('on created');
    }
  }
</script>

<template>
  <Modal 
    @modalOpenState="openModal" 
    :modalOpen="data.modalOpen"

    :class="data.modalOpen ? 'show' : ''">
    <Support 
      v-if="data.currentModal === 'Support'"/>
    <HowToPlay 
      v-if="data.currentModal === 'HowToPlay'"/>
    <GameDayEnded 
      v-if="gameEnded && data.currentModal === 'GameDayEnded'"
      :statistics="data.statistics"
      :todaysAttempt="data.todaysAttempts"/>
    <GameRoundEnded 
      v-if="!gameEnded && data.currentModal === 'GameRoundEnded'"
      :todaysAttempts="data.todaysAttempts"
      :boardState="data.boardState"/>
  </Modal>
  <Nav 
    @setCurrentModal="setCurrentModal"
    :data="data"/>
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
