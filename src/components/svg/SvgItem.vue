<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="width && height ? `0 0 ${width} ${height}` : ''"
    @click="$emit('click', $event)"
  >
    <use :href="`#${id}`"></use>
  </svg>
</template>

<script lang="ts">
export default {
  name: 'SvgItem',
  props: {
    id: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    }
  }
}
</script>

<style scoped>

</style>
