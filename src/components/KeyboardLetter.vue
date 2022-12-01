<script>
  export default {
    props: {
      letter: String
    }
  }
</script>
<template>
  <li class="keyboard-letter">{{ letter }}</li>
</template>
<style lang="scss" scoped>

@import "../assets/breakpoints.scss";

@media (min-width: $grid-breakpoints-md){
  .keyboard-letter {
    min-width: 40px !important;
  }
}

</style>