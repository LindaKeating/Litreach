<template>
  <div class="HowToPlay"> 
    <font-awesome-icon 
      :class="'col-1'"
      icon="fa-solid fa-circle-1" />
    <p class="col-11 ps-2">{{dictionary.HowToPlayStepOne.ga}}</p>
    <font-awesome-icon 
      :class="'col-1'"
      icon="fa-solid fa-circle-2" />
    <p class="col-11 ps-2">{{dictionary.HowToPlayStepTwo.ga}}</p>
    <font-awesome-icon
      :class="'col-1'"
      icon="fa-solid fa-circle-3" />
    <p class="col-11 ps-2">{{dictionary.HowToPlayStepThree.ga}}</p>
    <font-awesome-icon 
      :class="'col-1'"
      icon="fa-solid fa-circle-4" />
    <p class="col-11 ps-2">{{dictionary.HowToPlayStepFour.ga}}</p>
    <font-awesome-icon 
      :class="'col-1'"
      icon="fa-solid fa-circle-5" />
    <p class="col-11 ps-2 mb-5">{{dictionary.HowToPlayStepFive.ga}}</p>

    <hr/>
    <p></p>
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
      max-width: 250px;
    }

    svg {
      padding-top: .5rem;
    }
  }
</style>