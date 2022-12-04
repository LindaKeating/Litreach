<script>
  export default {
    props: {
      letter: String
    }
  }
</script>
<template>
  <li class="KeyboardLetter keyboard-letter">{{ letter }}<slot></slot></li>
</template>
<style lang="scss" scoped>

@import "../assets/breakpoints.scss";
@import "../assets/variables.scss";

.KeyboardLetter {
    list-style: none;
    text-align: center;
    background: #fff;
    border: 1px solid $vt-c-black-mute;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    margin: 0 3px 3px 0;
    min-width: 8vw;
    height: 8vh;
    min-height: 35px;
    max-height: 40px;
    line-height: 2.3;
    text-transform: uppercase;
    font-weight: 700;
}

.EnterKey {
  padding-left: 1vw;
  padding-right: 1vw;
}



@media (min-width: $grid-breakpoints-md){
  .KeyboardLetter {
    min-width: 40px !important;
  }
}

// iphone 5 
@media (min-height: $height-breakpoint-568) {
  .KeyboardLetter {
    max-height: 50px;
    font-size: 20px;
    line-height: 2;
  }
}

@media (min-height: $height-breakpoint-667) {
  .KeyboardLetter {
    font-size: 22px;
    line-height: 2.1;

    &.EnterKey {
      line-height: 2.9;;
    }
  }
}

@media (prefers-color-scheme: dark) {
    .GameLetter {
      border: 1px solid $vt-c-black-mute;
      background-color: $vt-c-indigo;
    }
  }

</style>