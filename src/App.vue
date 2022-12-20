<script >
  import { answers, ulsterStartTimes, ulsterDurations, definitions, connaghtStartTimes, connaghtDurations, kerryStartTimes, kerryDurations } from  '../src/answers.js';
  import '../src/dates.js';


  import Nav from './components/Nav.vue'
  import Keyboard from './components/Keyboard.vue'
  import GameArea from './components/GameArea.vue'
  import Modal from './components/Modal.vue'
  import GameRoundEnded from './components/GameRoundEnded.vue'
  import GameDayEnded from './components/GameDayEnded.vue'
  import HowToPlay from './components/HowToPlay.vue'
  import Support from './components/Support.vue'
  import Audio from './components/Audio.vue'
  import { dictionary } from './dictionary';

  let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let todaysDOY = new Date().getDOY() - 15;
  let todaysPuzzle = [answers[todaysDOY * 5], answers[(todaysDOY * 5) + 1], answers[(todaysDOY * 5) + 2], answers[(todaysDOY * 5) + 3], answers[(todaysDOY * 5) + 4]];
  let uladhStartTimes = [ulsterStartTimes[todaysDOY * 5], ulsterStartTimes[(todaysDOY * 5) + 1], ulsterStartTimes[(todaysDOY * 5) + 2], ulsterStartTimes[(todaysDOY * 5) + 3], ulsterStartTimes[(todaysDOY * 5) + 4]];
  let uladhDurations = [ulsterDurations[todaysDOY * 5], ulsterDurations[(todaysDOY * 5) + 1], ulsterDurations[(todaysDOY * 5) + 2], ulsterDurations[(todaysDOY * 5) + 3], ulsterDurations[(todaysDOY * 5) + 4]];
  let connStartTimes = [connaghtStartTimes[todaysDOY * 5], connaghtStartTimes[(todaysDOY * 5) + 1], connaghtStartTimes[(todaysDOY * 5) + 2], connaghtStartTimes[(todaysDOY * 5) + 3], connaghtStartTimes[(todaysDOY * 5) + 4]];
  let connDurations = [connaghtDurations[todaysDOY * 5], connaghtDurations[(todaysDOY * 5) + 1], connaghtDurations[(todaysDOY * 5) + 2], connaghtDurations[(todaysDOY * 5) + 3], connaghtDurations[(todaysDOY * 5) + 4]];
  let kStartTimes = [kerryStartTimes[todaysDOY * 5], kerryStartTimes[(todaysDOY * 5) + 1], kerryStartTimes[(todaysDOY * 5) + 2], kerryStartTimes[(todaysDOY * 5) + 3], kerryStartTimes[(todaysDOY * 5) + 4]];
  let kDurations = [kerryDurations[todaysDOY * 5], kerryDurations[(todaysDOY * 5) + 1], kerryDurations[(todaysDOY * 5) + 2], kerryDurations[(todaysDOY * 5) + 3], kerryDurations[(todaysDOY * 5) + 4]];
  let todaysDefinitions = [definitions[todaysDOY * 5], definitions[(todaysDOY * 5) + 1], definitions[(todaysDOY * 5) + 2], definitions[(todaysDOY * 5) + 3], definitions[(todaysDOY * 5) + 4]];

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
          currentModal: '',
          todaysAttempts: puzzleState.todaysAttempts,
          currentRound: puzzleState.currentRound,
          statistics: puzzleState.statistics,
          lastPlayedDate: puzzleState.lastPlayedDate,
          incorrectGuessRow: undefined,
          uladhStartTimes: uladhStartTimes,
          uladhDurations: uladhDurations,
          connStartTimes: connStartTimes,
          connDurations: connDurations,
          kDurations: kDurations,
          kStartTimes: kStartTimes,
          definitions: todaysDefinitions,
          dictionary: dictionary,
          tileTimeouts: false
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
          this.data.tileTimeouts = true;
          this.data.boardState[this.data.puzzlePosition.row] = this.data.currentGuess;
          setTimeout(() => {
            this.updateTodaysAttemptsRecord();
            this.setNextRoundPuzzlePosition();
            this.data.currentGuess = "";
            this.updateStatistics();
            this.moveToNextRound();
            this.updateLocalStoragePuzzleState();  
            this.data.currentModal = "GameRoundEnded";
            this.data.modalOpen = true;
            this.data.tileTimeouts = false;
            }, (this.data.todaysPuzzle[currentRound].length + 1) * 250); 
        } else if (this.data.currentGuess.length === this.data.todaysPuzzle[currentRound].length){
          // show the wrong answer toast after delay
          this.data.tileTimeouts = true;
          setTimeout(() => {
            this.data.tileTimeouts = false;
            this.$toast.error(this.data.dictionary.AppToastWrongAnswer.ga, {
              position: 'top'
            });
          }, (this.data.todaysPuzzle[currentRound].length + 1) * 250); 

          // set which row is wrong
          this.data.incorrectGuessRow = this.data.puzzlePosition.row;

          // set the board state
          this.data.boardState[this.data.puzzlePosition.row] = this.data.currentGuess;

          // reset current guess for next round
          this.data.currentGuess = "";

          // reset the puzzle position for next round
          this.updatePuzzlePosition();
          // round over but not game over
          if (this.data.puzzlePosition.row === 5 && this.data.currentRound < 4) {
            this.updateTodaysAttemptsRecord();
            setTimeout(() => {
            this.data.currentModal = "GameRoundEnded";
            this.data.modalOpen = true;
            this.moveToNextRound();
            }, (this.data.todaysPuzzle[currentRound].length + 1) * 250);
          } 

          // round over && game over
          if (this.data.puzzlePosition.row === 5 && this.data.currentRound == 4) {
            this.moveToNextRound();
            this.updateStatistics();
            this.updateTodaysAttemptsRecord();
            setTimeout(() => { 
              this.data.currentModal = "GameDayEnded";
              this.data.modalOpen = true;
            }, (this.data.todaysPuzzle[currentRound].length + 1) * 250); 
          } 

          this.updateLocalStoragePuzzleState();
        } else {
          console.log('Not a correct answer or a completed answer')
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
      Support,
      VueToastr,
      Audio
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
    }
  }
</script>

<template>
  <Modal 
    @modalOpenState="openModal" 
    :modalOpen="data.modalOpen"
    :currentModal="data.currentModal"
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
      @modalOpenState="openModal"
      v-if="data.currentModal === 'GameRoundEnded'"
      :dark-mode="data.darkMode"
      :todaysAttempts="data.todaysAttempts"
      :boardState="data.boardState"
      :darkMode="data.darkMode"
      />
  </Modal>
  <Nav 
    @setCurrentModal="setCurrentModal"
    :definition="data.definitions[data.currentRound]"
    :game-ended="gameEnded"
    :data="data"/>
  <GameArea
    :board-state="data.boardState"
    :puzzlePosition="data.puzzlePosition"
    :currentGuess="data.currentGuess"
    :answer="data.todaysPuzzle[data.currentRound]"
    :todaysAnswer="data.todaysPuzzle[data.currentRound]" 
    :currentRound="data.currentRound"
    :incorrectGuessRow="data.incorrectGuessRow"
    :start-time="data.uladhStartTimes[data.currentRound]"
    :duration="data.uladhDurations[data.currentRound]"
    :uladh-start-time="data.uladhStartTimes[data.currentRound]"
    :uladh-duration="data.uladhDurations[data.currentRound]"
    :conn-start-time="data.connStartTimes[data.currentRound]"
    :conn-duration="data.connDurations[data.currentRound]"
    :k-start-time="data.kStartTimes[data.currentRound]"
    :k-duration="data.kDurations[data.currentRound]"
    :file="'./Litreach-Leachtanch13.mp3'"
    :definition="data.definitions[data.currentRound]"
    :tile-timeouts="data.tileTimeouts"
    /> 

  <Keyboard 
    @deleteLastLetter="backspaceCurrentGuess"
    @addLetterToBoard="updateCurrentGuess"
    @submitWordAttempt="submitWordAttempt"
    :darkMode="data.darkMode"
    :currentRound="data.currentRound"
    :definition="data.definitions[data.currentRound]"
  />
  <GameDayEnded 
    class="App-GameDayEnded"
    v-if="gameEnded || data.currentModal === 'GameDayEnded'"
    :darkMode="data.darkMode"
    :height="'400px'"
    :statistics="data.statistics"
    :todaysAttempt="data.todaysAttempts"/>
   
</template>

<style scoped lang="scss">

.App{
  &-GameDayEnded {
    max-width: 500px;
  }
}
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
