<template>
  <div class="block-view">
    <transition-group name="list">
      <div
        v-for="(block) in blocks"
        :key="block.type === 'image' ? block.value[0].name : block.value"
        class="block-view__item"
      >
        <block-item
          :block="block"
          @delete="deleteBlock"
          @change="changeBlock(block, $event)"
          @move="moveBlock"
        />
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { IBlock, IBlockData } from '@/types/block.type'
import BlockItem from '@/components/block/BlockItem.vue'

export default Vue.extend({
  name: 'BlockList',
  components: { BlockItem },
  props: {
    blocks: {
      type: Array as PropType<IBlockData>,
      required: true
    }
  },
  methods: {
    deleteBlock (block: IBlock) {
      this.$emit('change', this.blocks.filter(item => item !== block))
    },
    changeBlock (oldBlock: IBlock, newBlock: IBlock) {
      const blocks = Array.from(this.blocks)
      console.log(blocks)
      const index = blocks.findIndex(item => item === oldBlock)
      blocks[index] = newBlock
      this.$emit('change', blocks)
    },
    moveBlock (data: { direction: 'up' | 'down', block: IBlock }) {
      const { direction, block } = data
      const blocks = Array.from(this.blocks)
      const index = blocks.findIndex(item => item === block)

      if (direction === 'up') {
        const secondBlockIndex = index - 1

        if (index === 0 || !blocks[secondBlockIndex]) {
          return
        }

        const temporaryBlock = blocks[secondBlockIndex]
        blocks[secondBlockIndex] = blocks[index]
        blocks[index] = temporaryBlock
      } else if (direction === 'down') {
        const secondBlockIndex = index + 1

        if (index === blocks.length || !blocks[secondBlockIndex]) {
          return
        }

        const temporaryBlock = blocks[secondBlockIndex]
        blocks[secondBlockIndex] = blocks[index]
        blocks[index] = temporaryBlock
      }

      this.$emit('change', blocks)
    }
  }
})
</script>

<style lang="stylus" scoped>
.block-view
  max-width: 400px;
  display grid;
  grid-template-columns 1fr
  margin auto

// Для анимации появления/удаления
// Убрал, потому что появлялся неприятный эффект при изменении данных
// не хотел на это много времени тратить
//.list-enter-active, .list-leave-active
//  transition transform 1s
//
//.list-enter, .list-leave-to
//  opacity 0
//  transform translateY(30px)

.list-move
  transition: transform 1s;

</style>
