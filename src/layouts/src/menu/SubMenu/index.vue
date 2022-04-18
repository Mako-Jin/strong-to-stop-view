<template>
  <a-sub-menu :key="menu.path">
    <!-- <template #icon></template> -->
    <template #icon>
      <svg-icon :name="menu.meta && menu.meta.icon" />
    </template>
    <template #title>{{ menu.meta && $t(menu.meta.title) }}</template>
    <template v-for="item in menu.children" :key="item.path">
      <template v-if="item.meta && !item.meta.hidden">
        <a-menu-item v-if="!item.children" :key="item.path">
          <router-link :to="item.path">
            {{ item.meta && $t(item.meta.title) }}
          </router-link>
        </a-menu-item>
        <template v-else>
          <sts-sub-menu :key="menu.path" :menu="item" />
        </template>
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteRecordRaw } from "vue-router";

export default defineComponent({
  name: "StsSubMenu",
  components: {},
  props: {
    menu: {
      type: Object as PropType<RouteRecordRaw>,
      default: () => ({}),
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less"></style>
