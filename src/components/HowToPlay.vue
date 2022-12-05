<template>
  <div class="HowToPlay"> 
    <font-awesome-icon 
      :class="'col-1'"
      icon="fa-solid fa-circle-1" />
    <p class="col-11">{{dictionary.HowToPlayStepOne.ga}}</p>
    <font-awesome-icon 
      :class="'col-1'"
      icon="fa-solid fa-circle-2" />
    <p class="col-11">{{dictionary.HowToPlayStepTwo.ga}}</p>
    <font-awesome-icon
      :class="'col-1'"
      icon="fa-solid fa-circle-3" />
    <p class="col-11">{{dictionary.HowToPlayStepThree.ga}}</p>
    <font-awesome-icon 
      :class="'col-1'"
      icon="fa-solid fa-circle-4" />
    <p class="col-11">{{dictionary.HowToPlayStepFour.ga}}</p>
    <font-awesome-icon 
      :class="'col-1'"
      icon="fa-solid fa-circle-5" />
    <p class="col-11">{{dictionary.HowToPlayStepFive.ga}}</p>

    <div class="HowToPlay-Sponser">
      <img 
        class="HowToPlay-LogoSponsor"
        src="../assets/Foras_Logo.png" />
    </div>
  </div>
</template>
<script>
 import { dictionary } from '../dictionary';
 export default {
  data () {
    return {
      dictionary: dictionary
    }
  }
 }
</script>
<style lang="scss" scoped>
  .HowToPlay {
    height: 80vh;
    position: relative;
    display: flex;
    flex-wrap: wrap;

    &-Sponsor {
      width: 50vw;
    }

    &-LogoSponsor {
      width: 100%;
    }

    svg {
      padding-top: .5rem;
    }
  }
</style>