<template>
  <button
    class="app-button"
    :disabled="disabled"
    :type="type"
    @click="$emit('click')"
  >
    <span class="app-button__text">
      <slot/>
    </span>

    <svg-item
      v-if="iconId"
      class="app-button__icon"
      :width="24" :height="24" :id="iconId"
    />

  </button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import SvgItem from '@/components/svg/SvgItem.vue'
export default Vue.extend({
  name: 'AppButton',
  components: { SvgItem },
  props: {
    iconId: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button'
    }
  }
})
</script>

<style lang="stylus" scoped>
.app-button
  display: flex;
  align-items: center;
  gap: .5em;
  padding .5em .75em
  border: 1px solid var(--border-color);
  outline 0
  background-color white;
  color var(--text-color)
  &:focus
    border-color var(--focus-color)
  &:active
    background-color var(--active-color)
  &:disabled
    opacity .5
</style>
