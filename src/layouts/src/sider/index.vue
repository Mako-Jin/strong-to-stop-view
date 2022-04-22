<template>
  <a-layout-sider
    class="sts-layout-sider"
    :collapsed="getCollapsed"
    :trigger="null"
    collapsible
  >
    <div class="logo"></div>
    <sts-layout-menu theme="dark" menuMode="inline" :routes="routes" />
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useMenuSetting } from "/@/hooks/useMenuSetting";
import StsLayoutMenu from "../menu/index.vue";
import { MenuPosition } from "/@/enums/MenuEnums";
import { RouteRecordRaw } from "vue-router";

export default defineComponent({
  name: "StsLayoutSider",
  components: {
    StsLayoutMenu,
  },
  props: {
    menus: {
      type: Array as PropType<RouteRecordRaw[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { getCollapsed } = useMenuSetting();

    const routes = props.menus.filter(
      (menu) => menu.meta && menu.meta.position === MenuPosition.SIDER
    );

    return {
      getCollapsed,
      routes,
    };
  },
});
</script>

<style lang="less">
.sts-layout-sider {
  overflow: auto;
  height: 100vh;
  position: "fixed";
  left: 0;
  top: 0;
  bottom: 0;

  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
}
</style>
