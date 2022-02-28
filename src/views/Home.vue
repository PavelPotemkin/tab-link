<template>
  <main class="container">
    <section class="block-constructor">
      <h1>Создайте свой уникальный шаблон из блоков</h1>

      <block-add @addBlock="addBlock"/>

      <block-list
        :blocks="blocks"
        @change="changeBlocks"
      />

      <app-button
        v-show="blocks.length"
        class="block-constructor__save-btn"
        @click="saveBlockList"
      >
        Сохранить
      </app-button>
    </section>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import BlockAdd from '@/components/block/BlockAdd.vue'
import { IBlock, IBlockData } from '@/types/block.type'
import BlockList from '@/components/block/BlockList.vue'
import AppButton from '@/ui/AppButton.vue'

export default Vue.extend({
  name: 'Home',
  components: { AppButton, BlockList, BlockAdd },
  data () {
    return {
      blocks: [] as IBlockData
    }
  },
  methods: {
    addBlock (block: IBlock) {
      this.blocks.push(block)
    },
    changeBlocks (blocks: IBlock[]) {
      this.blocks = blocks
    },
    async saveBlockList () {
      //  Тут мы к примеру отправляем данные на бэк
      const blocks = Array.from(this.blocks)
      console.log(blocks)

      const result = await new Promise(resolve => resolve('Готово'))
      console.log(result)
    }
  }
})
</script>

<style lang="stylus" scoped>
.block-constructor__save-btn
  margin 2em auto
</style>
