<template>
  <div v-on:change="onUpdate" class="container">
    <checkbox v-for="option in options" :key="option.id" :id="option.id" :val="option" v-model="selected">
      {{ option.text }}
    </checkbox>
  </div>
</template>

<script>
import Checkbox from './../components/Checkbox';
import options from './../assets/data/task';

export default {
  text: 'taskFilter',

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
