<template>
  <div
    class="app-file-field"
    @dragover.prevent
    @drop.prevent
  >
    <div
      v-if="imageUrlList"
      class="app-file-field__examples"
    >
      <app-modal v-model="exampleImagesDisplay">
        <app-image-list
          :images="exampleImages"
          @chose="getExampleImage"
        />
      </app-modal>

      <app-button @click="showExampleImages">
        Изображения
      </app-button>
    </div>

    <label
      class="app-file-field__label"
      @drop="dragFile"
    >
      <input
        ref="input"
        class="app-file-field__input"
        type="file"
        :multiple="multiple"
        @input="uploadFile"
        accept="image/*"
      />

      <span
        class="app-file-field__box"
        :class="filesBoxClassObject"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @drop="onDragLeave">
        {{dragAndDropText}}
      </span>
    </label>

    <template v-if="files && files.length">
      <ul
        class="app-file-field__list"
      >
        <li
          v-for="(file,index) in files"
          class="app-file-field__item"
          :title="file.name"
          :key="file.name"
        >
          <span class="app-file-field__item-name">
            {{ file.name }}
          </span>

          <svg-item
            class="app-file-field__icon"
            :width="24" :height="24" id="close"
            @click="removeFile(index)"
          />
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import SvgItem from '@/components/svg/SvgItem.vue'
import AppImageList, { IImageList, IImageListItem } from '@/ui/AppImageList.vue'
import AppModal from '@/ui/AppModal.vue'
import AppButton from '@/ui/AppButton.vue'

export default Vue.extend({
  name: 'AppFileField',
  components: { AppButton, AppModal, AppImageList, SvgItem },
  props: {
    value: {
      type: FileList,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    imageUrlList: {
      type: Array as PropType<string[]>,
      default: null
    }
  },
  data () {
    return {
      isFilesBoxDrag: false as boolean,
      exampleImagesDisplay: false
    }
  },
  methods: {
    emitInputFilesChange (files: FileList): void {
      this.$emit('input', files)
    },
    setDataFiles (files: FileList | null): void {
      if (!files) {
        return
      }

      if (this.multiple) {
        this.emitInputFilesChange(files)
      } else {
        const newFiles = new DataTransfer()
        const file = files[0]

        if (file) {
          newFiles.items.add(new File([file], file.name, { type: file.type }))
        }

        this.emitInputFilesChange(newFiles.files)
      }
    },
    uploadFile (e: Event): void {
      if (e.target) {
        this.setDataFiles((e.target as HTMLInputElement).files)
      }
    },
    dragFile (e: DragEvent): void {
      if (e.dataTransfer) {
        this.setDataFiles(e.dataTransfer.files)
      }
    },
    removeFile (index: number): void {
      const files: File[] = Array.from(this.files || [])
      files.splice(index, 1)

      const newFiles = this.getFileListFromArray(files)

      this.setDataFiles(newFiles)
    },
    getFileListFromArray (files: File[]): FileList {
      const newFiles = new DataTransfer()

      files.forEach(file => {
        newFiles.items.add(new File([file], file.name, { type: file.type }))
      })

      return newFiles.files
    },
    onDragEnter (): void {
      this.isFilesBoxDrag = true
    },
    onDragLeave (): void {
      this.isFilesBoxDrag = false
    },
    async convertURLtoFile2 (img: IImageListItem): Promise<File> {
      const { url, name } = img
      const response = await fetch(url)
      const data = await response.blob()
      const metadata = { type: 'image/jpeg' }
      return new File([data], name, metadata)
    },
    getImageNameFromUrl (url: string): string {
      const array = url.split('/')
      return array[array.length - 1]
    },
    showExampleImages (): void {
      this.exampleImagesDisplay = true
    },
    async getExampleImage (img: IImageListItem): Promise<void> {
      this.exampleImagesDisplay = false
      const file = await this.convertURLtoFile2(img)

      const files = this.getFileListFromArray([file])
      this.setDataFiles(files)
    }
  },
  computed: {
    exampleImages (): IImageList {
      const images: IImageList = []

      if (this.imageUrlList) {
        this.imageUrlList.forEach(imageUrl => {
          images.push({
            name: this.getImageNameFromUrl(imageUrl),
            url: imageUrl
          })
        })
      }

      return images
    },
    dragAndDropText (): string {
      const text = 'Drag and drop files or click here'

      return Array.from(this.imageUrlList || []).length
        ? text + ' or select file from examples'
        : text
    },
    filesBoxClassObject (): {[key: string]: boolean} {
      return {
        'app-file-field__box_drag': this.isFilesBoxDrag
      }
    },
    files (): File[] {
      return Array.from(this.value)
    }
  }
})
</script>

<style lang="stylus" scoped>
.app-file-field
  width: fit-content
  padding .5em .75em
  border 1px solid var(--border-color)
  max-width 300px

.app-file-field__box
  display inline-block
  padding .5em .75em
  border 1px dashed currentColor
  outline 0
  cursor: pointer
  color var(--text-color)
  &_drag
    color green

.app-file-field__label
  display block

.app-file-field__input
  position absolute
  width 1px
  height 1px
  margin -1px
  border 0
  padding 0
  white-space nowrap
  clip-path inset(100%)
  clip rect(0 0 0 0)
  overflow hidden
  &:focus
    & + .app-file-field__box
      color var(--focus-color)

.app-file-field__list
  padding 0
  max-height: 200px;
  overflow-y: auto;

.app-file-field__item
  list-style none
  margin auto
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
  display: grid
  grid-template-columns: 1fr auto
  align-items: center
  text-align lef
  gap: .5em
  margin-left 0
  margin-right 0
  &:not(:last-of-type)
    margin-bottom 8px

.app-file-field__item-name
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
  text-align: left;

.app-file-field__icon
  cursor pointer
.app-file-field__examples
  display flex
  justify-content  center
  margin-bottom 1em
  margin-top .5em
</style>
