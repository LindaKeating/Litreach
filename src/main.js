import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from 'vue'
import App from './App.vue';

import './assets/main.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faPhone , faStar} from "@fortawesome/free-solid-svg-icons";
import { far, faStar as farStar} from "@fortawesome/free-regular-svg-icons";

library.add(
  fas,
  far,
  faPhone,
  faStar,
  farStar
  );

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');


import "bootstrap/dist/js/bootstrap.js"