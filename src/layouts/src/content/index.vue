<template>
  <a-layout-content :style="{ margin: '24px 16px 0' }">
    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
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
