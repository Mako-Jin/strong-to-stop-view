<template>
  <a-layout-sider
    class="sts-layout-sider"
    :collapsed="getCollapsed"
    :trigger="null"
    collapsible
  >
    <div class="logo"></div>
    <sts-layout-menu theme="dark" menuMode="inline" />
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMenuSetting } from "/@/hooks/useMenuSetting";
import StsLayoutMenu from "../menu/index.vue";

export default defineComponent({
  name: "StsLayoutSider",
  components: {
    StsLayoutMenu,
  },
  setup() {
    const { getCollapsed } = useMenuSetting();

    return {
      getCollapsed,
    };
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
