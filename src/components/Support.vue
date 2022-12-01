<template>
  <div class="Support">
    <p className="SettingModal-paragraph">             
      Tabhair le fios dúinn, le do thoil, má thugann tú faoi deara aon rud nach bhfuil ag obair i gceart, trí
        <a :href="`mailto:linda.mary.keating@gmail.com?subject=Fadhb le Litreach&body=**** Seo iad mo shonraí width:${screenWidth} height:${screenHeight} userAgent:${userAgent} platform:${platform} vendor:${vendor} version: ${version}`"> ríomhphost a chur </a> chugainn. 
               Mínigh, chomh cruinn agus is féidir, caidé nach bhfuil ag obair duit agus déanfaidh muid ár ndícheall é a chóiriú chomh luath agus is féidir.
    </p>
    <p>{{ dictionary.SupportBrowser.ga }}</p>
    <p>{{ dictionary.SupportHelpMsg.ga }}</p>
  </div>
</template>


<script>
  import { dictionary } from '../dictionary';
  const env = import.meta.env;

  export default {
    data() {
      return {
        platform: navigator?.userAgentData?.platform || navigator?.platform || 'unknown',
        userAgent: navigator.userAgent,
        vendor: navigator.vendor,
        screenWidth: window.screen.availWidth,
        screenHeight: window.screen.availHeight,
        version: __APP_VERSION__,
        dictionary: dictionary
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