<template>
  <div class="Support">
    <p className="SettingModal-paragraph">             
      Tabhair le fios dúinn, le do thoil, má thugann tú faoi deara aon rud nach bhfuil ag obair i gceart, trí
        <a :href="`mailto:linda.mary.keating@gmail.com?subject=Fadhb le Litreach&body=**** Seo iad mo shonraí width:${screenWidth} height:${screenHeight} userAgent:${userAgent} platform:${platform} vendor:${vendor} version: ${version}`"> ríomhphost a chur </a> chugainn. 
               Mínigh, chomh cruinn agus is féidir, caidé nach bhfuil ag obair duit agus déanfaidh muid ár ndícheall é a chóiriú chomh luath agus is féidir.
    </p>
    <p>Your browser and system details will automatically be included in the email, but please do not delete them when sending the email</p>
    <p>We will do our best to resolve any issue you have and answer any questions you have as soon as possible</p>
  </div>
</template>
<script>
    const env = import.meta.env;
    console.log(env);
  export default {
    data() {
      return {
        platform: navigator?.userAgentData?.platform || navigator?.platform || 'unknown',
        userAgent: navigator.userAgent,
        vendor: navigator.vendor,
        screenWidth: window.screen.availWidth,
        screenHeight: window.screen.availHeight,
        version: __APP_VERSION__
      }
      
    }
  }
</script>
<style lang="scss" scoped>
  .Support {
    display: flex;
    flex-wrap: wrap;
  }
</style>