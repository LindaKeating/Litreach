<template>
  <div class="GameRoundEnded">
    <ul class="list-group">
      <li
        :class="{ 'GameRoundEnded-DarkList': this.darkMode }"
        v-for="attempt in todaysAttempts"
        class="list-group-item">  
        <h5 
          :class="{ 'GameRoundEnded-DarkText': this.darkMode }"
          class="mb-1 GameRoundEnded-Text">{{ attempt.answer }}</h5>
        <small class="GameRoundEnded-Definition"><i>{{ attempt.definition }}</i></small>
        <Stars :attempts="attempt.attempts"/>
      </li>
    </ul>
    <button 
      @click.prevent="close"
      title="Ar aghaidh"
      class="mt-3 btn btn-secondary">{{dictionary.GameRoundEndedNextRoundButton.ga}}</button>
  </div>
</template>
<script>
import Stars from './Stars.vue';
import { dictionary } from '../dictionary';
export default {
  props : {
    boardState: Array,
    todaysAnswer: String,
    todaysAttempts: Array,
    darkMode: Boolean
  },
  data() {
    return {
      dictionary: dictionary
    }
  },
  methods: {
    close() {
        this.$emit("modalOpenState", !this.modalOpen)
    }
  },
  mounted() {
    console.log(this.todaysAttempts)
    console.log(`the Game Round Ended component is now mounted.`)
  },
  components: {
    Stars
  },
  emits: {
    modalOpenState() { return true},
  }

}
</script>
<style lang="scss" scoped>
@import "../assets/variables.scss";

.GameRoundEnded {
  display: flex;
  flex-direction: column;

  &-Definition {
      display: block;
      color: $vt-c-text-dark-2;
  }
}

@media (prefers-color-scheme: dark) { 
  .GameRoundEnded {
    &-DarkList {
      background-color: #ffffff12;
    }

    &-DarkText {
      color: white;
    }

  }
}
</style>