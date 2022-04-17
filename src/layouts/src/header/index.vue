<template>
  <a-layout-header class="sts-layout-header">
    <div class="sts-layout-header-left">
      <sts-sider-trigger />
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StsSiderTrigger from "../components/trigger/index.vue";

export default defineComponent({
  name: "StsLayoutHeader",
  components: {
    StsSiderTrigger,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less">
.sts-layout-header {
  background: @color-white;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: space-between;

  &-left {
    display: flex;
    height: 100%;
    align-items: center;
  }

  &-right {
    display: flex;
    min-width: 180px;
    align-items: center;
  }
}
</style>
