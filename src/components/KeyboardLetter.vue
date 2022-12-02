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
.KeyboardLetter {
    list-style: none;
    text-align: center;
    background: #fff;
    border: 1px solid #f9f9f9;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    margin: 0 5px 5px 0;
    min-width: 8vw;
    height: 8vh;
    min-height: 35px;
    max-height: 40px;
    line-height: 2.3;
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

</style>