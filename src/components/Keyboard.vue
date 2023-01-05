<script>
  import KeyboardLetter from '../components/KeyboardLetter.vue'
  export default {
    props: {
      darkMode: Boolean,
      currentRound: Number,
      definition: String
    },
    components: {
      KeyboardLetter
    },
    created() {
      // finds the characters being typed
      window.addEventListener('keypress', this.doKeyPressEvent);
      window.addEventListener('keyup', this.doKeyUpEvent);
    },
    destroyed() {
      window.removeEventListener('keypress', this.doKeyPressEvent);
    },
    emits: {
      submitWordAttempt() { return true},
      deleteLastLetter() { return true},
      addLetterToBoard(letter) { return true}
    },
    methods: {
      doKeyPressEvent(e) {
        e.preventDefault();
        const allowedChars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','á','é','í','ó','ú' ];
        let cmd = String.fromCharCode(e.keyCode).toLowerCase();

        if(allowedChars.includes(cmd)) {
          this.$emit('addLetterToBoard', cmd);
        }
      },
      doKeyUpEvent(e) {
        e.preventDefault();
        if(e.key.toLowerCase() == 'enter'){
          this.$emit('submitWordAttempt');
        }

        if(e.key.toLowerCase() == 'backspace') {
          this.$emit('deleteLastLetter');
        }
      }
    }
  }
</script>

<template>
    <div 
      v-if="this.currentRound < 5"
      class="keyboard Keyboard margin-top">
          <ul class="keyboard-row text-dark">
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'á');"
              :letter="'á'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'é');"
              :letter="'é'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'í');"
              :letter="'í'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'ó');"
              :letter="'ó'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'ú');"
              :letter="'ú'" />
          </ul>
          <ul class="keyboard-row">
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'e');"
              :letter="'e'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'r');"
              :letter="'r'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 't');"
              :letter="'t'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'u');"
              :letter="'u'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'i');"
              :letter="'i'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'o');"
              :letter="'o'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'p');"
              :letter="'p'" />
          </ul>
          <ul class="keyboard-row">
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'a');"
              :letter="'a'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 's');"
              :letter="'s'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'd');"
              :letter="'d'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'f');"
              :letter="'f'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'g');"
              :letter="'g'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'h');"
              :letter="'h'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'l');"
              :letter="'l'" />
          </ul>
          <ul class="keyboard-row">
            <KeyboardLetter
              title="Seol d'fhreagra"
              class="EnterKey"
              @click="this.$emit('submitWordAttempt');"
              @keyup.enter="this.$emit('EnterKey', 'CheckRow')"
              :letter="'LITRIGH'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'c');"
              :letter="'c'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'v');"
              :letter="'v'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'b');"
              :letter="'b'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'n');"
              :letter="'n'" />
            <KeyboardLetter
              @click="this.$emit('addLetterToBoard', 'm');"
              :letter="'m'" />
            <KeyboardLetter
              title="Scrios"
              class="keyboard-letter  lastitem">
              <font-awesome-icon 
                @click="this.$emit('deleteLastLetter');"
                icon="fa-regular fa-delete-left" />
            </KeyboardLetter>
          </ul>
    </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";
@import "../assets/breakpoints.scss";

ul.keyboard-row,
ul.answer-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2px !important;
  padding-left: 0 !important;
}

.letter {
    list-style: none;
    text-align: center;
    background: #fff;
    border: 1px solid #f9f9f9;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    margin: 0 5px 5px 0;
    min-width: 8vw;
}

.keyboard {
  //  position: absolute;
  //  bottom: 0;
  //  left: 0; 
  //  right: 0; 
    margin-left: auto; 
    margin-right: auto; 
    width: 100vw; /* Need a specific value to work */
}

#keyboard .return {
    width: 77px;
}

.keyboard .right-shift {
    width: 100px;
}

@media (prefers-color-scheme: dark) {

  .keyboard-letter {
    background-color: $vt-c-indigo;
    border: 1px solid $vt-c-black-mute;
  }

}

@media (min-height: $height-breakpoint-667) {
  .keyboard-letter {
  }
}
</style>