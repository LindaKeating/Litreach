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
    list-style: none;
    text-align: center;
    background: #fff;
    border: 1px solid $vt-c-black-mute;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    margin: 0 3px 3px 0;
    min-width: 7vw;
    height: 11vh;
    min-height: 35px;
    max-height: 40px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 12px;
}

.EnterKey {
  font-size: 15px;
  padding-left: 1vw;
  padding-right: 1vw;
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

@media (min-height: $height-breakpoint-667) {
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