<template>
  <form class="block-crud-form" @submit="saveBlockData">
    <app-select
      class="block-crud-form__select"
      v-model="selectValue"
      :values="selectValues"
    />

    <template v-for="block of blocksData">
      <component
        v-if="block.type === selectValue.value"
        :is="block.component"
        :key="block.type"
        v-model="block.value"
        :image-url-list="exampleImagesUrl"
      />
    </template>

    <div v-if="!selectValue.value">
      <slot>
        Выберите тип нового блока
      </slot>
    </div>

    <div class="block-crud-form__controls">
      <slot name="controls" v-bind="{isBlockEmpty, saveBlockData}">
        <app-button
          :disabled="isBlockEmpty"
          type="submit"
          @click="saveBlockData"
        >
          Сохранить
        </app-button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import AppTextField from '@/ui/AppTextField.vue'
import AppFileField from '@/ui/AppFileField.vue'
import AppButton from '@/ui/AppButton.vue'
import AppModal from '@/ui/AppModal.vue'
import AppSelect, { ISelectItem } from '@/ui/AppSelect.vue'
import { IBlock, IBlockAdd, IBlockAddData } from '@/types/block.type'

export default Vue.extend({
  name: 'BlockCrudFrom',
  components: {
    AppSelect,
    AppModal,
    AppButton,
    AppFileField,
    AppTextField
  },
  props: {
    value: {
      type: Object as PropType<IBlock>,
      default: null
    },
    clearValueOnSelectChange: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      blocksData: [
        {
          type: 'text',
          name: 'Текст',
          defaultValue: '',
          value: '',
          isBlockEmpty () {
            return !this.value
          },
          component: AppTextField
        },
        {
          type: 'image',
          name: 'Изображение',
          defaultValue: new DataTransfer().files,
          value: new DataTransfer().files,
          isBlockEmpty () {
            return !this.value.length
          },
          component: AppFileField
        }
      ] as IBlockAddData,
      selectValue: {} as ISelectItem,
      exampleImagesUrl: [
        '/example-images/cat-jump.png',
        '/example-images/cat-lie.png',
        '/example-images/placeholder-image.png'
      ]
    }
  },
  created () {
    if (this.value) {
      const { name, type, value } = this.value

      this.selectValue = {
        value: type,
        name: name
      }

      const currentBlock = this.blocksData.find(block => block.type === type)

      if (currentBlock) {
        currentBlock.value = value
      }
    }
  },
  computed: {
    currentBlock (): IBlockAdd | undefined {
      return this.blocksData.find(block => block.type === this.selectValue.value)
    },
    isBlockEmpty (): boolean {
      return !this.currentBlock || this.currentBlock.isBlockEmpty()
    },
    selectValues (): ISelectItem[] {
      return this.blocksData.map(block => {
        return {
          name: block.name,
          value: block.type
        }
      })
    }
  },
  methods: {
    setBlockValuesToDefault (): void {
      for (const key in this.blocksData) {
        const block = this.blocksData[key]
        block.value = block.defaultValue
      }
    },
    saveBlockData (event?: Event): void {
      event && event.preventDefault()

      if (this.currentBlock) {
        this.$emit('change', {
          name: this.currentBlock.name,
          type: this.currentBlock.type,
          value: this.currentBlock.value
        })
      }
    }
  },
  watch: {
    selectValue (): void {
      if (this.clearValueOnSelectChange) {
        this.setBlockValuesToDefault()
      }
    }
  }
})
</script>

<style lang="stylus" scoped>
.block-crud-form__select
  margin-bottom 1em

.block-crud-form__controls
  display flex
  justify-content space-between
  margin-top 1em
  gap: 1em;
</style>
