<template>
  <div id="app">
    <svg-sprite/>

    <router-view/>
  </div>
</template>
<script>
import SvgSprite from '@/components/svg/SvgSprite'
export default {
  components: { SvgSprite }
}
</script>
