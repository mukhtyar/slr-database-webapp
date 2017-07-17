<template>
  <div id="app">

    <div class="row">
      <div class="col-xs-8" tabindex="1">
        <div class="category category-task" style="height:100%;">
          <div class="box">
            <h3>
              What are you working on?
            </h3>
            <p>
              Select one or more primary task that a particular resource could be helpful in accomplishing.
            </p>
            <taskFilter v-on:change="updateTaskFilters"></taskFilter>
          </div>
        </div>
      </div>

      <div class="col-xs-4" tabindex="1" style="height:100%;">
        <div class="category category-phase">
          <div class="box">
            <h3>
              What stage are you at?
            </h3>
            <phaseFilter v-on:change="updatePhaseFilters"></phaseFilter>
          </div>
        </div>
      </div>
    </div>

    <div class="row">

      <div class="col-xs-3" tabindex="1">
        <div class="row">
          <div class="col-xs-12">
            <div class="category category-challenge">
              <div class="box">
                <h3>
                  What challenges are you facing?
                </h3>
                <challengeFilter v-on:change="updateChallengeFilters"></challengeFilter>
              </div>
            </div>
          </div>
          <div class="col-xs-12">
            <div class="category category-place">
              <div class="box">
                <span>
                  Filter by Region
                </span>
                <select>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-xs-12">
            <div class="category category-resource">
              <div class="box">
                <span>
                  Filter by Resource Type
                </span>
                <select>
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="col-xs-9 results" tabindex="1">
        <div class="green" div v-if="rowsToRender.length != 0">
          Resources: <span>{{ rowsToRender.length }}</span>
        </div>
        <div v-for="row in rowsToRender" @click="displayRowDetail(row)" class="article">
          <h6 class="article-title">{{ row.title }}</h6>
          <div class="list article-authors">
            <ul>
              <li v-for="author in row.author" class="author">{{ author }}</li>
            </ul>
          </div>
          <div class="list">
            <span class="article-date green">{{ row.pubdate }}</span>
            <ul class="article-type">
              <li v-for="item in row.resourceType" class="tag">{{ resourceTypes[item].text }}</li>
            </ul>
            <ul class="article-location">
              <li v-for="item in row.county" class="purple">{{ places[item].place }} County</li>
            </ul>
          </div>
          <div class="list article-keywords">
            <span>Keywords:</span>
            <ul>
              <li v-for="keyword in row.keywords" class="keyword">{{ keyword }}</li>
            </ul>
          </div>
        </div>
        <div v-if="rowsToRender.length == 0">
          <p class="message">Sorry, no resources were found matching you criteria.</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import tingle from 'tingle.js';
import 'tingle.js/dist/tingle.css';
import PhaseFilter from './components/PhaseFilter';
import ChallengeFilter from './components/ChallengeFilter';
import TaskFilter from './components/TaskFilter';
import data from './assets/data/data';
import resourceTypes from './assets/data/resource';
import places from './assets/data/place';

const findOne = (haystack, arr) => arr.some(v => haystack.indexOf(v) >= 0);

export default {
  name: 'app',
  components: {
    ChallengeFilter,
    PhaseFilter,
    TaskFilter,
  },
  data() {
    return {
      data,
      phaseFilters: [],
      challengeFilters: [],
      taskFilters: [],
      resourceTypes,
      places,
      showModal: false,
    };
  },
  computed: {
    rowsToRender() {
      let filtered = this.data;
      const phases = this.phaseFilters;
      const challenges = this.challengeFilters;
      const tasks = this.taskFilters;
      if (tasks.length > 0) {
        filtered = filtered.filter(item => findOne(item.task, tasks));
      }
      if (challenges.length > 0) {
        filtered = filtered.filter(item => findOne(item.challenge, challenges));
      }
      if (phases.length > 0) {
        filtered = filtered.filter(item => findOne(item.phase, phases));
      }

      return filtered;
    },
  },
  methods: {
    updatePhaseFilters(value) {
      this.phaseFilters = value.map(d => d.id);
    },
    updateChallengeFilters(value) {
      this.challengeFilters = value.map(d => d.id);
    },
    updateTaskFilters(value) {
      this.taskFilters = value.map(d => d.id);
    },
    displayRowDetail(row) {
      console.log(row);
      /* eslint-disable */
      // instanciate new modal
      const modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function() {
            console.log('modal open');
        },
        onClose: function() {
            console.log('modal closed');
        },
        beforeClose: function() {
            // here's goes some logic
            // e.g. save content before closing the modal
          return true; // close the modal
          return false; // nothing happens
        }
      });

      // set content
      modal.setContent(`${row.title}`);

      // add a button
      modal.addFooterBtn('Link to Resource', 'tingle-btn tingle-btn--primary', function() {
          // here goes some logic
          modal.close();
      });

      // open modal
      modal.open();
    },
  },
};
</script>

