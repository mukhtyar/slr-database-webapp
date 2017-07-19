// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Sticky from 'sticky-js';
import App from './App';

import './assets/scss/main.scss';

Vue.config.productionTip = false;

/* eslint-disable */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});

// const header = document.querySelector('.results-header');
// const sidebar = document.querySelector('.results-sidebar');
// const results = document.querySelector('.results-main');

// const stickyHeader = new Sticky('.results-header');
const stickyContent = new Sticky('.results-main');
