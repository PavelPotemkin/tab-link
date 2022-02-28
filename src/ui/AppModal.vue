<template>
  <div
    v-if="value"
    class="app-modal"
  >
    <div class="app-modal__inner">
      <svg-item
        class="app-modal__icon"
        :width="24" :height="24" id="close"
        @click="hide"
      />

      <slot v-bind="{hide}"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgItem from '@/components/svg/SvgItem.vue'

export default Vue.extend({
  name: 'AppModal',
  components: { SvgItem },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    show () {
      this.$emit('input', true)
    },
    hide () {
      this.$emit('input', false)
    }
  }
})
</script>

<style lang="stylus" scoped>
.app-modal
  position fixed
  right 0
  bottom 0
  left 0
  top 0
  display: flex
  align-items center
  justify-content center
  z-index: 9;
  &:before
    background-color: rgba(0,0,0,.15);
    content ''
    position fixed
    right 0
    bottom 0
    left 0
    top 0

.app-modal__inner
  position relative
  min-width 300px
  max-width calc(100vw - 32px)
  width: min-content;
  background-color white
  padding 1em
  box-shadow 0 0 1px 1px grey

.app-modal__icon
  position absolute
  right 0
  top 0
  transform translateX(50%) translateY(-50%)
  border 1px solid var(--border-color)
  border-radius 50%
  background-color white
  cursor pointer
</style>
