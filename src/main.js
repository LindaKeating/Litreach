import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from 'vue'
import App from './App.vue';

import Toaster from "@meforma/vue-toaster";

import './assets/main.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faPhone , faStar, faChartLine, faEnvelope, faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { far, faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faCircleE } from "@fortawesome/pro-solid-svg-icons";
import { faCircle1, faCircle2, faCircle3, faCircle4, faCircle5 } from "@fortawesome/pro-solid-svg-icons";
import { faDeleteLeft } from "@fortawesome/pro-regular-svg-icons";

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
  faCirclePlay
  );

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


createApp(App)
  .use(Toaster)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');


import "bootstrap/dist/js/bootstrap.js"