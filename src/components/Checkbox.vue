<template>
  <div class='checkbox'>
    <input type='checkbox' :id='id' :value='val' v-model='checked' @change='onChange' />
    <label :for='id'><slot></slot></label>
  </div>
</template>

<script>
export default {
  name: 'checkbox',

  props: ['id', 'value', 'val'],

  data() {
    return {
      proxy: false,
    };
  },

  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(value) {
        this.proxy = value;
      },
    },
  },

  methods: {
    onChange() {
      this.$emit('input', this.proxy);
    },
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .checkbox {
    display: flex;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    align-items: center;
  }

  .checkbox input {
    padding: 0;
    margin: 0;
  }

  .checkbox label {
    cursor: pointer;
    color: rgb(80, 80, 80);
    margin-left: 0.2em;
    padding: 0.5em;
    line-height: 1.3;
  }
</style>
