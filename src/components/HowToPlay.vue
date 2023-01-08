<template>
  <div class="HowToPlay"> 
    <div class="HowToPlay-Instructions">
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
    </div>
   

      <button 
      @click="playNow"
      class="btn btn-secondary HowToPlay-PlayButton">Imir Anois</button>
    

    <hr/>
    <h6>Buíochas</h6>
    <small class="col-11 mb-5 HowToPlay-Acknowledgements">
      Buíochas le Clodagh Ní Ghallchóir, Caitríona Ní Dhomhnaill agus Sláine Ní Chathalláin as na focail a léamh amach.
      Buíochas leis an fhoireann uilig i Stiúideo Raidió na Life agus le Donal Hennessy i Stiúideo Mhic an Daill.
      Buíochas le Gráinne Ní Scolláin in Foras na Gaeilge agus le hEoghan Mac Giolla Bhríde as a chomhairle.
      <p class="signature"> Linda Keating
        <small>Dearthóir agus forbróir gréasáin</small>
      </p> 
    </small>

    <hr/>
   
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
  },
  methods: {
    playNow() {
      this.$emit("setPlayedBefore", !this.modalOpen);
      this.$emit("modal-open-state", false);
    }
  }
 }
</script>
<style lang="scss" scoped>
@import "../assets/variables.scss";
  .HowToPlay {
    height: 80vh;

    &-Instructions {
      position: relative;
      display: flex;
      flex-wrap: wrap;
    }

    &-PlayButton {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    .signature {
      padding-top: 1rem;
      display: block;
      font-family: ShadowsIntoLight;
      small {
        display: block;
        font-family: LatoLatin;
      }
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