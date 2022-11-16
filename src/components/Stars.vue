<template>
  <font-awesome-icon 
    v-for="index in 5"
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
        return "fa-sold fa-star"
      } else {
        return "fa-regular fa-star"
      }
    }
  }
}
</script>