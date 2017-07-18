<template>
  <div class="container">
      <select v-model="selected" v-on:change="onUpdate">
        <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.text }}
        </option>
      </select>
  </div>
</template>

<script>
import options from './../assets/data/region';

export default {
  name: 'regionFilter',

  data() {
    return {
      selected: '',
      options,
    };
  },

  methods: {
    onUpdate() {
      this.$emit('change', this.selected);
    },
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
