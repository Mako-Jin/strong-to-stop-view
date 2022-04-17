<template>
  <a-layout>
    <!-- 侧边菜单栏 -->
    <sts-layout-sider />
    <a-layout>
      <!-- 头部 -->
      <sts-layout-header />
      <!-- 主体内容 -->
      <sts-layout-content />
      <!-- 脚部 -->
      <sts-layout-footer />
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StsLayoutSider from "./sider/index.vue";
import StsLayoutHeader from "./header/index.vue";
import StsLayoutContent from "./content/index.vue";
import StsLayoutFooter from "./footer/index.vue";

export default defineComponent({
  name: "StsLayout",
  components: {
    StsLayoutSider,
    StsLayoutHeader,
    StsLayoutContent,
    StsLayoutFooter,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less"></style>
