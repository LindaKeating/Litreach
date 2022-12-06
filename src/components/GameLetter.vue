<script>

export default {
    props: {
      letter: String,
      puzzlePosition: Object,
      answerLength: Number
    },
    computed: {
      tileWidth() {
        return (84 / this.answerLength) + 'vw';
      }
    },
    methods: {
      
    }
  }
</script>

<template >
    <li 
      :key="letter"
      :style="{'width': tileWidth } "
      :class="[{'animate__pulse': letter }]"
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
    font-size: 1.2rem;
    font-weight: 700;
    min-height: 6vh;
    line-height: 6vh;
    list-style: none;
    text-align: center;
    border: 1px solid $vt-c-black-mute;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    margin: 0 5px 5px 0;
    background-color: white;
   // min-width: 8vw;
  }

  // shake animations
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

@keyframes pulse {
  10%,
  90% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  20% {
    -webkit-transform: scale3d(1.05, 1.05, 1.05);
    transform: scale3d(1.05, 1.05, 1.05);
  }

  30%,
  50%,
  70%  {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
.animate__pulse {
  animation: pulse 0.82s;
  transform: translate3d(0,0,0);
}

  @media (min-width: $grid-breakpoints-md){
    .GameLetter {
      width: 40px !important;
    }
  }

  @media (prefers-color-scheme: dark) {
    .GameLetter {
      border: 1px solid $vt-c-black-mute;
      background-color: $vt-c-indigo;
    }

  }

  @media (min-height: $height-breakpoint-568) {
    .GameLetter {
      font-size: 1.3rem;
    }
  }

  @media (min-height: $height-breakpoint-667) {
    .GameLetter {
      font-size: 1.4rem;
    }
  }
</style>