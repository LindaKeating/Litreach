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
    <small class="col-11 mb-5 HowToPlay-Acknowledgements">
      Buíochas le Clodagh Ní Ghallchóir, Caitríona Ní Dhomhnaill agus Sláine Ní Chathalláin as na focail a léamh amach.
      Buíochas leis an fhoireann uilig i Stiúideo Raidió na Life agus le Donal Hennessy i Stiúideo Mhic an Daill.
      Buíochas le Gráinne Ní Scolláin in Foras na Gaeilge agus le hEoghan Mac Giolla Bhríde as a chomhairle.

      <small class="signature">Linda Keating</small>
    </small>
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
@import "../assets/variables.scss";
  .HowToPlay {
    height: 80vh;
    position: relative;
    display: flex;
    flex-wrap: wrap;

    .signature {
      display: block;
      font-family: ShadowsIntoLight;
    }

    &-Acknowledgements {
      font-size: .75em;
      color: $vt-c-text-dark-2;
    }

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