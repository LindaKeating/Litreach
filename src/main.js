import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from 'vue';
import App from './App.vue';

import Toaster from "@meforma/vue-toaster";
import Popper from "vue3-popper";

import './assets/main.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faPhone , faStar, faChartLine, faEnvelope, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { far, faCircleQuestion, faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faCircleE , faWaveformLines, faLightbulbExclamationOn, faGaugeLow, faGauge } from "@fortawesome/pro-solid-svg-icons";
import { faCircle1, faCircle2, faCircle3, faCircle4, faCircle5 } from "@fortawesome/pro-solid-svg-icons";
import { faDeleteLeft } from "@fortawesome/pro-regular-svg-icons";

import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() { console.log('need refresh')},
  onOfflineReady() { console.log('offline ready')},
});


library.add(
  fas,
  far,
  faPhone,
  faStar,
  farStar,
  faCircleE,
  faChartLine,
  faEnvelope,
  faCircle1,
  faCircle2,
  faCircle3,
  faCircle4,
  faCircle5,
  faDeleteLeft,
  faCirclePlay,
  faWaveformLines,
  faLightbulbExclamationOn,
  faGaugeLow,
  faGauge,
  faCircleQuestion
  );

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./assets/popper.css"; // Magic happens here


createApp(App)
  .use(Toaster)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('Popper', Popper)
  .mount('#app');


import "bootstrap/dist/js/bootstrap.js"

