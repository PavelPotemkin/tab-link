<template>
  <div class="app-image-list">
    <div
      v-for="image in images"
      :key="image.url"
      class="app-image-list__item"
    >
      <img
        height="80"
        :src="image.url"
        class="app-image-list__image"
        alt="Пример изображения"
        :title="image.name"
      >

      <div class="app-image-list__inner">
        <span class="app-image-list__text">
          {{image.name}}
        </span>

        <app-button
          class="app-image-list__btn"
          @click="choseImage(image)"
        >
          Выбрать
        </app-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import AppButton from '@/ui/AppButton.vue'

export interface IImageListItem {
  name: string,
  url: string
}

export type IImageList = IImageListItem[]

export default Vue.extend({
  name: 'AppImageList',
  components: { AppButton },
  props: {
    images: {
      type: Array as PropType<IImageList>,
      required: true
    }
  },
  methods: {
    choseImage (img: IImageListItem) {
      this.$emit('chose', img)
    }
  }
})
</script>

<style lang="stylus" scoped>
.app-image-list
  display flex
  flex-direction column
  gap .5em

.app-image-list__item
  display grid
  grid-template-columns 1fr 1fr
  gap .5em

.app-image-list__image
  width 100%
  object-fit contain

.app-image-list__inner
  display flex
  flex-direction column
  align-items center
  justify-content center
  gap .5em
</style>
