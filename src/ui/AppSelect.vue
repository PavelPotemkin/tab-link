<template>
  <select
    class="app-select"
    @change="changeValue"
  >
    <option selected disabled>
      Выберите значение
    </option>
    <option
      class="app-select__item"
      v-for="val in values"
      :key="val.value"
      :value="val.value"
      :selected="val.value === value.value"
    >
      {{val.name}}
    </option>
  </select>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

export interface ISelectItem {
  name: string
  value: string
}

export default Vue.extend({
  name: 'AppSelect',
  props: {
    value: {
      type: Object as PropType<ISelectItem>,
      required: true
    },
    values: {
      type: Array as PropType<ISelectItem[]>,
      required: true
    }
  },
  methods: {
    changeValue (e: Event) {
      const value = (e.target as HTMLInputElement).value
      const item = this.values.find(val => val.value === value)

      item && this.$emit('input', item)
    }
  }
})
</script>

<style lang="stylus" scoped>
.app-select
  padding .5em .75em
  border 1px solid currentColor
  color var(--text-color)
  background-color: white;
  outline none
  &:focus
    color var(--focus-color)
</style>
