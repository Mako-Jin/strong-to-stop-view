<template>
  <a-menu :mode="menuMode" :theme="theme">
    <template v-for="item in routes" :key="item.path"> </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { MenuMode } from "/@/enums/MenuEnums";
import { ThemeType } from "/@/enums/ThemeEnums";

export default defineComponent({
  name: "StsSiderMenu",
  components: {},
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
    return {};
  },
});
</script>

<style lang="less"></style>
