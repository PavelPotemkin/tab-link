<template>
  <img
    v-if="block.type === 'image'"
    :src="createImageSrcFromFile(block)"
    alt="Изображение"
  >

  <span
    v-else-if="block.type === 'text'"
  >
    {{block.value}}
  </span>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { IBlock, IBlockImage } from '@/types/block.type'

export default Vue.extend({
  name: 'BlockItemView',
  props: {
    block: {
      type: Object as PropType<IBlock>,
      required: true
    }
  },
  methods: {
    createImageSrcFromFile (file: IBlockImage) {
      return URL.createObjectURL(Array.from(file.value)[0])
    }
  }
})
</script>

<style scoped>

</style>
