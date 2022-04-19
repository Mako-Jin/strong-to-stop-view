<template>
  <a-menu-item :key="menu.path">
    <template v-if="!onlyShowIcon && menu.meta.icon" #icon>
      <svg-icon :name="menu.meta && menu.meta.icon" />
    </template>
    <router-link :to="menu.path">
      <svg-icon v-if="onlyShowIcon && menu.meta.icon" :name="menu.meta.icon" />
      <span v-else>
        {{ menu.meta && $t(menu.meta.title) }}
      </span>
    </router-link>
  </a-menu-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteRecordRaw } from "vue-router";

export default defineComponent({
  name: "StsMenuItem",
  components: {},
  props: {
    menu: {
      type: Object as PropType<RouteRecordRaw>,
      default: () => ({}),
    },
    onlyShowIcon: {
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
