<template>
  <a-layout-header class="sts-layout-header">
    <div class="sts-layout-header-left">
      <sts-sider-trigger />
      <layout-breadcrumb :menus="menus" />
    </div>
    <div class="sts-layout-header-right">
      <locale-switch />
      <user-dropdown />
      <setting-drawer />
    </div>
  </a-layout-header>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import StsSiderTrigger from "../components/trigger/index.vue";
import LayoutBreadcrumb from "../components/breadcrumb/index.vue";
import LocaleSwitch from "../components/locale/index.vue";
import UserDropdown from "../components/dropdown/index.vue";
import SettingDrawer from "../components/setting/index.vue";
import { RouteRecordRaw } from "vue-router";

export default defineComponent({
  name: "StsLayoutHeader",
  components: {
    StsSiderTrigger,
    LayoutBreadcrumb,
    LocaleSwitch,
    UserDropdown,
    SettingDrawer,
  },
  props: {
    menus: {
      type: Array as PropType<RouteRecordRaw[]>,
      default: () => [],
    },
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
