<template>
  <div id="app" class="grid">
    <div class="item small" tabindex="1">
      <div class="box">
        <phaseFilter v-on:change="onPhaseFiltersChange"></phaseFilter>
      </div>
    </div>
    <div class="item small" tabindex="1">
      <div class="box">
        <challengeFilter v-on:change="onChallengeFiltersChange"></challengeFilter>
      </div>
    </div>
    <div class="item big" tabindex="1">
      <div v-for="row in rowsToRender" class="box">
        {{ row.title }}
      </div>
    </div>
  </div>
</template>

<script>
import PhaseFilter from './components/PhaseFilter';
import ChallengeFilter from './components/ChallengeFilter';
import data from './assets/data/data';

export default {
  name: 'app',
  components: {
    ChallengeFilter,
    PhaseFilter,
  },
  data() {
    return {
      data,
      phaseFilters: null,
    };
  },
  computed: {
    rowsToRender() {
      const filters = this.phaseFilters;
      const results = this.data.filter(el => filters.some(f => f.id === el.phase));
      return results;
    },
  },
  methods: {
    onPhaseFiltersChange(value) {
      this.phaseFilters = value;
      console.log('phases', value);
    },
    onChallengeFiltersChange(value) {
      console.log('challenges', value);
    },
  },
};
</script>
