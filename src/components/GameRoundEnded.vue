<template>
  <div>
    <ul class="list-group">
      <li
        v-for="attempt in todaysAttempts"
        class="list-group-item">  
        <h5 class="mb-1">{{ attempt.answer }}</h5>
        <Stars :attempts="attempt.attempts"/>
      </li>
    </ul>
    <button 
      class="btn">Next Round</button>
  </div>
</template>
<script>
import Stars from './Stars.vue'
export default {
  props : {
    boardState: Array,
    todaysAnswer: String,
    todaysAttempts: Array
  },
  methods: {

  },
  mounted() {
    console.log(this.todaysAttempts)
    console.log(`the Game Round Ended component is now mounted.`)
  },
  components: {
    Stars
  }

}
</script>