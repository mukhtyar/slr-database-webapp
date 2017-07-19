<template>
  <div>
      <select v-model="selected" v-on:change="onUpdate">
        <option v-for="option in options" :key="option.id" :value="option.id">
        {{ option.text }}
        </option>
      </select>
      <span class="reset" v-on:click="onReset">Reset</span>
  </div>
</template>

<script>
import options from './../assets/data/resource';

export default {
  name: 'resourceFilter',

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
    onReset() {
      this.selected = '';
      this.$emit('change', this.selected);
    },
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
