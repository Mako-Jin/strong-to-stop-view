<template>
  <a-sub-menu v-if="!onlyShowChild" :key="menu.path">
    <template #icon>
      <svg-icon :name="menu.meta && menu.meta.icon" />
    </template>
    <template #title>
      <span>{{ menu.meta && $t(menu.meta.title) }}</span>
    </template>
    <template v-for="item in menu.children" :key="item.path">
      <template v-if="item.meta && !item.meta.hidden">
        <template v-if="!item.children">
          <sts-menu-item :menu="item" :onlyShowIcon="onlyShowIcon" />
        </template>
        <template v-else>
          <sts-sub-menu
            :key="menu.path"
            :menu="item"
            :onlyShowIcon="onlyShowIcon"
            :onlyShowChild="onlyShowChild"
          />
        </template>
      </template>
    </template>
  </a-sub-menu>
  <template v-else>
    <template v-for="item in menu.children" :key="item.path">
      <template v-if="item.meta && !item.meta.hidden">
        <template v-if="!item.children">
          <sts-menu-item :menu="item" :onlyShowIcon="onlyShowIcon" />
        </template>
      </template>
    </template>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteRecordRaw } from "vue-router";
import StsMenuItem from "../MenuItem/index.vue";

export default defineComponent({
  name: "StsSubMenu",
  components: {
    StsMenuItem,
  },
  props: {
    menu: {
      type: Object as PropType<RouteRecordRaw>,
      default: () => ({}),
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
    return {};
  },
});
</script>

<style lang="less"></style>
