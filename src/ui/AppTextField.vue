<template>
  <input
    type="text"
    class="app-text-field"
    :value="value"
    :class="classObject"
    @input="onChange"
  >
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'AppTextField',
  props: {
    value: {
      type: String,
      required: true
    },
    primary: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classObject () {
      return {
        primary: this.primary
      }
    }
  },
  methods: {
    onChange (event) {
      this.$emit('input', event.target.value)
    }
  }
})
</script>

<style lang="stylus" scoped>
.app-text-field
  padding .5em .75em
  border: 1px solid var(--border-color);
  outline 0
  &:focus
    border-color var(--focus-color)
</style>
