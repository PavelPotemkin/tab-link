<template>
  <div
    class="block-item"
    draggable="true"
    :class="`block-item_${block.type}`"
  >
    <div class="block-item__controls">
      <svg-item
        class="block-item__icon"
        :width="24" :height="24" id="chevron-up"
        @click="moveBlock('up')"
      />
      <svg-item
        class="block-item__icon"
        :width="24" :height="24" id="chevron-down"
        @click="moveBlock('down')"
      />
      <div class="block-item__divider"></div>
      <svg-item
        class="block-item__icon"
        :width="24" :height="24" id="edit"
        @click="showEditModal"
      />
      <svg-item
        class="block-item__icon"
        :width="24" :height="24" id="close"
        @click="deleteBlock"
      />
    </div>

    <div class="block-item__inner">
      <block-item-view :block="block"/>
    </div>

    <block-edit
      v-model="editModalDisplay"
      :block="block"
      @editBlock="editBlock"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { IBlock } from '@/types/block.type'
import BlockItemView from '@/components/block/BlockItemView.vue'
import SvgItem from '@/components/svg/SvgItem.vue'
import BlockEdit from '@/components/block/BlockEdit.vue'

export default Vue.extend({
  name: 'BlockItem',
  components: { BlockEdit, SvgItem, BlockItemView },
  props: {
    block: {
      type: Object as PropType<IBlock>,
      required: true
    }
  },
  data () {
    return {
      editModalDisplay: false
    }
  },
  methods: {
    showEditModal () {
      this.editModalDisplay = true
    },
    editBlock (block: IBlock) {
      console.log(block)
      this.$emit('change', block)
    },
    deleteBlock () {
      this.$emit('delete', this.block)
    },
    moveBlock (direction: 'up' | 'down') {
      this.$emit('move', { direction, block: this.block })
    }
  }
})
</script>

<style lang="stylus" scoped>
.block-item
  position relative
  width 100%
  height 200px
  border 1px solid rgba(0, 0, 0, 20%)
  background-color white
  &_image img
    width 100%
    height 100%
    object-fit contain
  &_text
    text-align center

.block-item__controls
  position absolute
  top .5em
  right .5em
  left .5em
  display flex
  gap .5em

.block-item__icon
  cursor pointer
  background: rgba(0,0,0,0.2);
  border-radius: .25em;

.block-item__inner
  display flex
  align-items center
  justify-content center
  height 100%

.block-item__divider
  flex-grow: 1;
</style>
