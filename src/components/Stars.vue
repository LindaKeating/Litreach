<template>
  <font-awesome-icon 
    v-for="index in 5"
    :class="color(this.attempts, index)"
    :key="index"
    :icon="starType(this.attempts, index)" />
</template>
<script>
export default {
  props: {
    attempts: Number
  },
  data() {
    return {
      rounds: 5
    }
  },
  methods: {
    starType (number, index) {
      if ((5 - number) >= index) {
        return "fa-solid fa-star"
      } else {
        return "fa-regular fa-star"
      }
    },
    color (number, index) {
      if ((5 - number) >= index) {
        return "yellow"
      }
    }
  }
}
</script>
<style lang="scss" scoped>

@import "../assets/variables.scss";


.yellow {
  color: $stars-light-mode;
}
</style>