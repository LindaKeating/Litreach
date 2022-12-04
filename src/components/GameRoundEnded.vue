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
        <Stars :attempts="attempt.attempts"/>
      </li>
    </ul>
    <button 
      @click.prevent="close"
      class="mt-3 btn btn-secondary">Céad focal eile</button>
  </div>
</template>
<script>
import Stars from './Stars.vue'
export default {
  props : {
    boardState: Array,
    todaysAnswer: String,
    todaysAttempts: Array,
    darkMode: Boolean
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

.GameRoundEnded {
  display: flex;
  flex-direction: column;
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