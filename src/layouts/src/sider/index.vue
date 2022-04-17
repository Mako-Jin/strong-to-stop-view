<template>
  <a-layout-sider class="sts-layout-sider">
    <div class="logo"></div>
    我是侧边栏
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StsLayoutSider",
  components: {},
  setup() {
    return {};
  },
});
</script>

<style lang="less">
.sts-layout-sider {
  overflow: auto;
  height: 100vh;
  left: 0;

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
}
</style>
