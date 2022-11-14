<script>

export default {
    props: {
      letter: String,
      puzzlePosition: Object
    },
    computed: {
    },
    methods: {
      
    }
  }
</script>

<template >
  <li class="letter">{{ letter }}</li>
</template>
<style scope lang="scss">
  .correctLetter {
    background-color: green !important;
  }
</style>