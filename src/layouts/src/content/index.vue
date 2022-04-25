<template>
  <a-layout-content>
    <div :style="{ background: '#fff', minHeight: '360px' }">
      <router-view />
    </div>
  </a-layout-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StsLayoutContent",
  components: {},
  setup() {
    return {};
  },
});
</script>

<style lang="less"></style>
