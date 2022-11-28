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
  <li class="GameLetter">{{ letter }}</li>
</template>
<style scoped lang="scss">

  @import "../assets/breakpoints.scss";

  .correctLetter {
    background-color: green !important;
  }

  .GameLetter {
    min-height: 6vh;
    line-height: 6vh;
    list-style: none;
    text-align: center;
    border: 1px solid #f9f9f9;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    margin: 0 5px 5px 0;
    min-width: 8vw;
  }

  @media (min-width: $grid-breakpoints-md){
    .GameLetter {
      min-width: 50px;
    }
  }
</style>