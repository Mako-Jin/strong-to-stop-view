<template>
  <a-menu-item :key="menu.path">
    <template v-if="!onlyShowIcon && menu.meta.icon" #icon>
      <svg-icon :name="menu.meta && menu.meta.icon" />
    </template>
    <router-link :to="menu.path">
      <div v-if="onlyShowIcon && menu.meta.icon">
        <a-tooltip :title="$t(menu.meta.title)" color="blue">
          <a-button type="text" shape="circle">
            <template #icon><svg-icon :name="menu.meta.icon" /></template>
          </a-button>
        </a-tooltip>
      </div>
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
    const getPopupContainer = (trigger: HTMLElement) => {
      return trigger.parentElement;
    };

    return {
      getPopupContainer,
    };
  },
});
</script>

<style lang="less"></style>
