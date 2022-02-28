<template>
  <div class="block-add">
    <app-button
      class="block-add__btn"
      icon-id="plus"
      @click="openModal"
    >
      Добавить новый блок
    </app-button>

    <app-modal v-model="modalDisplay">
      <template v-slot:default="{hide}">
        <block-crud-from @change="saveBlockData">
          <template v-slot:controls="{isBlockEmpty, saveBlockData}">
            <app-button
              :disabled="isBlockEmpty"
              @click="saveBlockData"
            >
              Сохранить
            </app-button>

            <app-button
              @click="hide"
              :disabled="isBlockEmpty"
            >
              Закрыть
            </app-button>
          </template>
        </block-crud-from>
      </template>
    </app-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppButton from '@/ui/AppButton.vue'
import AppModal from '@/ui/AppModal.vue'
import { IBlock } from '@/types/block.type'
import BlockCrudFrom from '@/components/block/BlockCrudFrom.vue'

export default Vue.extend({
  name: 'BlockAdd',
  components: {
    BlockCrudFrom,
    AppModal,
    AppButton
  },
  data () {
    return {
      modalDisplay: false
    }
  },
  methods: {
    openModal () {
      this.modalDisplay = true
    },
    saveBlockData (block: IBlock) {
      this.$emit('addBlock', block)
      this.modalDisplay = false
    }
  }
})
</script>

<style lang="stylus" scoped>
.block-add__btn
  margin 1em auto
</style>
