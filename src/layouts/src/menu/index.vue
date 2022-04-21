<template>
  <a-menu
    :selectedKeys="getSelectedKeys"
    :mode="menuMode"
    :theme="theme"
    :open-keys="getOpenKeys"
    @open-change="onOpenChange"
    @click="selectMenu"
  >
    <template v-for="item in routes" :key="item.path">
      <template v-if="menuHasOneChildren(item) && !item.meta.hidden">
        <sts-menu-item :menu="item.children[0]" :onlyShowIcon="onlyShowIcon" />
      </template>
      <template v-else-if="item.children">
        <sts-sub-menu
          :key="item.path"
          :menu="item"
          :onlyShowIcon="onlyShowIcon"
          :onlyShowChild="onlyShowChild"
        />
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { MenuMode } from "/@/enums/MenuEnums";
import { ThemeType } from "/@/enums/ThemeEnums";
import StsSubMenu from "./SubMenu/index.vue";
import StsMenuItem from "./MenuItem/index.vue";
import { RouteRecordRaw } from "vue-router";
import { useInstalledMenuStore } from "/@/store/modules/menuStore";
import { useMenuSetting } from "/@/hooks/useMenuSetting";

export default defineComponent({
  name: "StsLayoutMenu",
  components: {
    StsSubMenu,
    StsMenuItem,
  },
  props: {
    theme: {
      type: [String] as PropType<ThemeType>,
      default: ThemeType.LIGHT,
    },
    menuMode: {
      type: [String] as PropType<MenuMode>,
      default: MenuMode.DEFAULT,
    },
    routes: {
      type: Array as PropType<RouteRecordRaw[]>,
      default: () => [],
    },
    onlyShowIcon: {
      type: Boolean,
      default: false,
    },
    onlyShowChild: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const menuStore = useInstalledMenuStore();

    const menuHasOneChildren = (menu: RouteRecordRaw): boolean => {
      if (!menu.children) {
        return false;
      }
      const childrenList = menu.children.filter((child) => !child.meta?.hidden);
      return !(childrenList.length > 1);
    };

    const { getSelectedKeys, getOpenKeys } = useMenuSetting();

    const selectMenu = ({ key }: { key: string }) => {
      menuStore.setSelectedKeys([key]);
    };

    /**
     * SubMenu 展开/关闭的回调
     */
    const onOpenChange = (openKeys: string[]) => {
      menuStore.setOpenKeys(openKeys);
    };

    return {
      menuHasOneChildren,
      getSelectedKeys,
      getOpenKeys,
      onOpenChange,
      selectMenu,
    };
  },
});
</script>

<style lang="less"></style>
