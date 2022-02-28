<template>
  <div class="block-edit">
    <app-modal
      :value="value"
      @input="modalDisplayChange"
    >
      <template v-slot:default="{hide}">
        <block-crud-from
          :value="block"
          @change="saveBlockData"
        >
          <template v-slot:controls="{isBlockEmpty, saveBlockData}">
            <app-button
              :disabled="isBlockEmpty"
              @click="saveBlockData"
            >
              Сохранить изменения
            </app-button>

            <app-button
              @click="hide"
              :disabled="isBlockEmpty"
            >
              Отменить изменения
            </app-button>
          </template>
        </block-crud-from>
      </template>
    </app-modal>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import AppButton from '@/ui/AppButton.vue'
import AppModal from '@/ui/AppModal.vue'
import { IBlock } from '@/types/block.type'
import BlockCrudFrom from '@/components/block/BlockCrudFrom.vue'

export default Vue.extend({
  name: 'BlockEdit',
  components: {
    BlockCrudFrom,
    AppModal,
    AppButton
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    block: {
      type: Object as PropType<IBlock>,
      required: true
    }
  },
  methods: {
    modalDisplayChange (value) {
      this.$emit('input', value)
    },
    saveBlockData (block: IBlock) {
      this.$emit('input', false)
      this.$emit('editBlock', block)
    }
  }
})
</script>

<style lang="stylus" scoped>
</style>
