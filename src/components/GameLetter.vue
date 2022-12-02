<script>

export default {
    props: {
      letter: String,
      puzzlePosition: Object,
      answerLength: Number
    },
    computed: {
      tileWidth() {
        return (87 / this.answerLength) + 'vw';
      }
    },
    methods: {
      
    }
  }
</script>

<template >
  <li 
    :style="{'width': tileWidth } "
    class="GameLetter" >{{ letter }}</li>
</template>
<style scoped lang="scss">

  @import "../assets/breakpoints.scss";
  @import "../assets/variables.scss";

  .correctLetter {
    background-color: $success-background !important;
  }

  .GameLetter {
    text-transform: uppercase;
    font-size: larger;
    font-weight: 700;
    min-height: 6vh;
    line-height: 6vh;
    list-style: none;
    text-align: center;
    border: 1px solid $vt-c-black-mute;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    margin: 0 5px 5px 0;
    background-color: $vt-c-indigo;
   // min-width: 8vw;
  }

  .shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

  @media (min-width: $grid-breakpoints-md){
    .GameLetter {
      width: 40px !important;
    }
  }
</style>