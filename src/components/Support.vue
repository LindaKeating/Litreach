<template>
  <div class="Support">
    <p className="SettingModal-paragraph">             
      Má thugann tú faoi deara rud ar bith faoin chluiche seo nach bhfuil ag obair i gceart, bheadh
muid buíoch dá gcuirfeá ar an eolas muid trí
        <a :href="`mailto:linda.mary.keating@gmail.com?subject=Fadhb le Litreach&body=**** Seo iad mo shonraí Leithead:${screenWidth} Airde:${screenHeight} userAgent:${userAgent} Ardán:${platform} díoltóir:${vendor} leagan: ${version}`"> ríomhphost a sheoladh </a> chugainn. 
               Mínigh an fhadhb, chomh cruinn agus is féidir, agus déanfaidh muid ár ndícheall é a chóiriú chomh luath agus is féidir linn.
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