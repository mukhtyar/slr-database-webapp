<template>
  <div v-on:change="onUpdate" class="container">
    <checkbox v-for="option in options" :key="option.id" :id="option.id" :val="option" v-model="selected">
      {{ option.text }}
    </checkbox>
  </div>
</template>

<script>
import Checkbox from './../components/Checkbox';
import options from './../assets/data/challenge';

export default {
  text: 'phaseFilter',

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
</style>
