<template>
  <div class="category challenge" v-on:change="onUpdate">
    <checkbox v-for="option in options" :id="option.name" :val="option" v-model="selected">{{ option.name }}</checkbox>
  </div>
</template>

<script>
import Checkbox from './../components/Checkbox';
import options from './../assets/data/challenge';

export default {
  name: 'phaseFilter',

  components: {
    Checkbox,
  },

  data() {
    return {
      options,
      selected: [],
    };
  },

  methods: {
    onUpdate() {
      this.$emit('change', this.selected);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .category .checkbox {
    /*margin: 10px 0;*/
  }
</style>
