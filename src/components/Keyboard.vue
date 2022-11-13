<script>
  import KeyboardLetter from '../components/KeyboardLetter.vue'
  export default {
    props: {
      darkMode: Object
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
        const allowedChars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','á','é','í','ó','ú' ];
        let cmd = String.fromCharCode(e.keyCode).toLowerCase();

        if(allowedChars.includes(cmd)) {
          this.$emit('addLetterToBoard', cmd);
        }
      },
      doKeyUpEvent(e) {
        e.stopImmediatePropagation();
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
    <div class="keyboard">
          <ul class="keyboard-row">
            <KeyboardLetter 
              @click="this.$emit('keyBoardClick', 'q')"
              :letter="'q'" />
            <KeyboardLetter :letter="'w'" />
            <KeyboardLetter :letter="'e'" />
            <KeyboardLetter :letter="'r'" />
            <KeyboardLetter :letter="'t'" />
            <KeyboardLetter :letter="'y'" />
            <KeyboardLetter :letter="'u'" />
            <KeyboardLetter :letter="'i'" />
            <KeyboardLetter :letter="'o'" />
            <KeyboardLetter :letter="'p'" />
          </ul>
          <ul class="keyboard-row">
            <KeyboardLetter :letter="'a'" />
            <KeyboardLetter :letter="'s'" />
            <KeyboardLetter :letter="'d'" />
            <KeyboardLetter :letter="'f'" />
            <KeyboardLetter :letter="'g'" />
            <KeyboardLetter :letter="'h'" />
            <KeyboardLetter :letter="'j'" />
            <KeyboardLetter :letter="'k'" />
            <KeyboardLetter :letter="'l'" />
          </ul>
          <ul class="keyboard-row">
            <KeyboardLetter :letter="'z'" />
            <KeyboardLetter :letter="'x'" />
            <KeyboardLetter :letter="'c'" />
            <KeyboardLetter :letter="'v'" />
            <KeyboardLetter :letter="'b'" />
            <KeyboardLetter :letter="'n'" />
            <KeyboardLetter :letter="'m'" />
          </ul>
          <ul class="keyboard-row">
            <KeyboardLetter 
              @keyup.enter="this.$emit('EnterKey', 'CheckRow')"
              :letter="'TOMHAS'" />
            <KeyboardLetter :letter="'á'" />
            <KeyboardLetter :letter="'é'" />
            <KeyboardLetter :letter="'ú'" />
            <KeyboardLetter :letter="'í'" />
            <KeyboardLetter :letter="'ó'" />
            <KeyboardLetter :letter="'m'" />
            <li class="keyboard-letter  lastitem">
              <i class="fa-solid fa-delete-left"></i>
            </li>
          </ul>
    </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";

ul.keyboard-row,
ul.answer-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 2px !important;
  padding-left: 0 !important;
}

.letter,
.keyboard-letter {
    list-style: none;
    text-align: center;
    background: #fff;
    border: 1px solid #f9f9f9;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    margin: 0 5px 5px 0;
    min-width: 8vw;
}

.keyboard-letter {
  list-style: none;
  height: 8vh;
  min-height: 35px;
  max-height: 40px;
  min-width: 8vw;
  line-height: 2.3;
}

.keyboard {
    position: absolute;
    bottom: 0;
    left: 0; 
    right: 0; 
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
.lastitem {
    margin-right: 0;
}

@media (prefers-color-scheme: dark) {

  .keyboard-letter {
    background-color: $vt-c-black-soft;
    border: 1px solid $vt-c-black-mute;
  }

}
</style>