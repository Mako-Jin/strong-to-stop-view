<template>
  <a-layout-sider
    class="sts-layout-sider"
    :collapsed="getCollapsed"
    :trigger="null"
    collapsible
  >
    <div class="logo"></div>
    <sts-sider-menu />
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMenuSetting } from "/@/hooks/useMenuSetting";
import StsSiderMenu from "../menu/index.vue";
import { menuStrategyFactory } from "/@/service/menuService";

export default defineComponent({
  name: "StsLayoutSider",
  components: {
    StsSiderMenu,
  },
  setup() {
    const { getCollapsed } = useMenuSetting();

    return {
      getCollapsed,
      getMenuList,
    };
  },
});

function getMenuList() {
  return menuStrategyFactory.call();
}
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
