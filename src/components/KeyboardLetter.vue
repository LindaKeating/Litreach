<script>
  export default {
    props: {
      letter: String
    }
  }
</script>
<template>
  <button li class="KeyboardLetter keyboard-letter">{{ letter }}<slot></slot></button>
</template>
<style lang="scss" scoped>

@import "../assets/breakpoints.scss";
@import "../assets/variables.scss";

.KeyboardLetter {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border: 1px solid $vt-c-black-mute;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    margin: 0 3px 3px 0;
    width: 16px;
    min-height: 58px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
}

.EnterKey {
  padding-left: 1vw;
  padding-right: 1vw;
  width: auto !important;
}



@media (min-width: $grid-breakpoints-md){
  .KeyboardLetter {

  }
}

// iphone 5 
@media (min-height: $height-breakpoint-568) {
  .KeyboardLetter {
    max-height: 50px;
  }
}

@media (min-width: $width-breakpoint-iphone4-5-SE) {

}

@media (min-width: $width-breakpoint-iphone6) {
  .KeyboardLetter {
    width: 7vw;
    margin: 0 5px 5px 0;
  }
}

@media (prefers-color-scheme: dark) {

  .KeyboardLetter {
    color: var(--color-text);
  }
  
  .GameLetter {
      border: 1px solid $vt-c-black-mute;
      background-color: $vt-c-indigo;
    }
  }

</style>