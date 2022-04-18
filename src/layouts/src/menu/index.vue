<template>
  <a-menu :mode="menuMode" :theme="theme">
    <template v-for="item in routes" :key="item.path">
      <template v-if="menuHasOneChildren(item) && !item.meta.hidden">
        <a-menu-item :key="item.children[0].path">
          <template #icon>
            <svg-icon :name="item.meta && item.meta.icon" />
          </template>
          <router-link :to="item.children[0].path">
            {{ item.children[0].meta && $t(item.children[0].meta.title) }}
          </router-link>
        </a-menu-item>
      </template>
      <template v-else-if="item.children">
        <sts-sub-menu :key="item.path" :menu="item" />
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { MenuMode, MenuPosition } from "/@/enums/MenuEnums";
import { ThemeType } from "/@/enums/ThemeEnums";
import { menuStrategyFactory } from "/@/service/menuService";
import StsSubMenu from "./SubMenu/index.vue";
import { RouteRecordRaw } from "vue-router";

export default defineComponent({
  name: "StsLayoutMenu",
  components: {
    StsSubMenu,
  },
  props: {
    theme: {
      type: [String] as PropType<ThemeType>,
      default: ThemeType.DARK,
    },
    menuMode: {
      type: [String] as PropType<MenuMode>,
      default: MenuMode.DEFAULT,
    },
  },
  setup() {
    const routes = getMenuList().filter(
      (menu) => menu.meta && menu.meta.position === MenuPosition.SIDER
    );

    const menuHasOneChildren = (menu: RouteRecordRaw): boolean => {
      if (!menu.children) {
        return false;
      }
      const childrenList = menu.children.filter((child) => !child.meta?.hidden);
      return !(childrenList.length > 1);
    };

    return {
      routes,
      menuHasOneChildren,
    };
  },
});

function getMenuList() {
  return menuStrategyFactory.call();
}
</script>

<style lang="less"></style>
