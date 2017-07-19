<template>
  <div id="app">

    <div class="row">
      <div class="col-xs-12" tabindex="1">
        <div class="category category-task category-main">
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
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div class="category category-challenge category-main">
          <div class="box">
            <h3>
              What challenges are you facing?
            </h3>
            <p>
              Select one or more challenges that you want to overcome.
            </p>
            <challengeFilter v-on:change="updateChallengeFilters"></challengeFilter>
          </div>
        </div>
      </div>
    </div>

    <div class="row results-header"  data-margin-top="-10">
      <div class="col-xs-12">
        <h5>List of Adaptation Resources</h5>
        <div class="inline-list">
          <span>Selected Tasks:</span>
          <span v-if="taskFilters.length == 0">Any</span>
          <ul v-else>
            <li v-for="item in taskFilters">{{ item.shorttext }}</li>
          </ul>
        </div>
         <div class="inline-list">
          <span>Selected Challenges:</span>
          <span v-if="challengeFilters.length == 0">Any</span>
          <ul v-else>
            <li v-for="item in challengeFilters">{{ item.text }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="row results-main">

      <div class="col-xs-3 results-sidebar" tabindex="1">
        <div class="row">
          <div class="col-xs-12" tabindex="1" style="height:100%;">
            <div class="category category-resource">
              <div class="box">
                <h6>
                  View Resources for Region:
                </h6>
                <regionFilter v-on:change="updateRegionFilter"></regionFilter>
              </div>
            </div>
            <div class="category category-resource">
              <div class="box">
                <h6>
                  Filter by Resource Type:
                </h6>
                <resourceFilter v-on:change="updateResourceFilter"></resourceFilter>
              </div>
            </div>
            <div class="category category-phase">
              <div class="box">
                <h6>
                  Filter by Planning Phase:
                </h6>
                <phaseFilter v-on:change="updatePhaseFilters"></phaseFilter>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xs-9 results-list" tabindex="1">
        <div v-if="rowsToRender.length != 0">
          <p class="green"> Showing <span>{{ rowsToRender.length }}</span> resources. Click on a resource to see more details.</p>
        </div>
        <div v-if="rowsToRender.length == 0">
          <p class="message">Sorry, no resources were found matching the criteria you selected.</p>
        </div>
        <transition-group name="list">
          <div v-for="row in rowsToRender" @click="displayRowDetail(row)" :key="row.id" class="article">
            <h6 class="article-title">{{ row.title }}</h6>
            <div class="inline-list article-authors">
              <ul>
                <li v-for="author in row.author" class="author">{{ author }}</li>
              </ul>
            </div>
            <div class="inline-list">
              <span class="article-date green">{{ row.pubdate }}</span>
              <ul class="article-type">
                <li v-for="key in row.resourceType" class="tag">{{ resourceTypes.find(d => d.id === key).text }}</li>
              </ul>
              <ul class="article-location">
                <li v-for="key in row.county" class="purple">{{ counties.find(d => d.id === key).name }} County</li>
              </ul>
            </div>
            <div class="inline-list article-keywords">
              <span>Keywords:</span>
              <ul>
                <li v-for="keyword in row.keywords" class="keyword">{{ keyword }}</li>
              </ul>
            </div>
          </div>
        </transition-group>
      </div>

    </div>

    </section>

  </div>
</template>

<script>
import tingle from 'tingle.js';
import 'tingle.js/dist/tingle.css';
import PhaseFilter from './components/PhaseFilter';
import ChallengeFilter from './components/ChallengeFilter';
import TaskFilter from './components/TaskFilter';
import RegionFilter from './components/RegionFilter';
import ResourceFilter from './components/ResourceFilter';
import data from './assets/data/data';
import resourceTypes from './assets/data/resource';
import counties from './assets/data/county';
import regions from './assets/data/region';

const findOne = (haystack, arr) => arr.some(v => haystack.indexOf(v) >= 0);

export default {
  name: 'app',
  components: {
    ChallengeFilter,
    PhaseFilter,
    TaskFilter,
    RegionFilter,
    ResourceFilter,
  },
  data() {
    return {
      data,
      phaseFilters: [],
      challengeFilters: [],
      taskFilters: [],
      regionFilter: '',
      resourceFilter: '',
      resourceTypes,
      counties,
      regions,
    };
  },
  computed: {
    rowsToRender() {
      let filtered = this.data;
      const phases = this.phaseFilters.map(d => d.id);
      const challenges = this.challengeFilters.map(d => d.id);
      const tasks = this.taskFilters.map(d => d.id);
      const region = this.regionFilter;
      const resource = this.resourceFilter;
      if (tasks.length > 0) {
        filtered = filtered.filter(item => findOne(item.task, tasks));
      }
      if (challenges.length > 0) {
        filtered = filtered.filter(item => findOne(item.challenge, challenges));
      }
      if (phases.length > 0) {
        filtered = filtered.filter(item => findOne(item.phase, phases));
      }
      if (region) {
        filtered = filtered.filter((item) => {
          const countyId = item.county;
          const regionArr = counties[countyId].region;
          return regionArr.some(v => v === region);
        });
      }
      if (resource) {
        filtered = filtered.filter((item) => {
          const resourceArr = item.resourceType;
          return resourceArr.some(v => v === resource);
        });
      }

      return filtered;
    },
  },
  methods: {
    updatePhaseFilters(value) {
      this.phaseFilters = value;
    },
    updateChallengeFilters(value) {
      this.challengeFilters = value;
    },
    updateTaskFilters(value) {
      this.taskFilters = value;
    },
    updateRegionFilter(value) {
      this.regionFilter = value;
    },
    updateResourceFilter(value) {
      this.resourceFilter = value;
    },
    displayRowDetail(row) {
      // instantiate new modal
      /* eslint-disable */
      const modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: 'Close',
        cssClass: ['resource-detail'],
        beforeClose() {
          console.log('increment count');
          return true; // close the modal
        },
      });
      /* eslint-enable */

      // set content
      modal.setContent(`
        <div class="article detail">
          <h5 class="article-title">${row.title}</h5>
          <div class="inline-list article-authors">
            <ul>
              ${row.author.map(author => `<li class="author">${author}</li>`)}
            </ul>
          </div>
          <div class="inline-list">
            <span class="article-date green">${row.pubdate}</span>
            <ul class="article-type">
              ${row.resourceType.map(item => `<li class="tag">${resourceTypes[item].text}</li>`)}
            </ul>
            <ul class="article-location">
              ${row.county.map(item => `<li class="purple">${counties[item].name} County</li>`)}
            </ul>
          </div>
          <div class="inline-list article-keywords">
            <span>Keywords:</span>
            <ul>
              ${row.keywords.map(item => `<li class="keyword">${item}</li>`)}
            </ul>
          </div>
          <div class="article-desc">
           <p>${row.description}</p>
          </div>
          <div class="article-link">
           <a href="${row.link}" target="_blank">Link to Resource</a>
          </div>
        </div>
      `);

      // open modal
      modal.open();
    },
  },
};
</script>
