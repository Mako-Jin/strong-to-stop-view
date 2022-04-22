<template>
  <div class="trigger" @click="toggleCollapsed">
    <svg-icon v-if="getCollapsed" name="menu-fold" />
    <svg-icon v-else name="menu-unfold" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useMenuSetting } from "/@/hooks/useMenuSetting";

export default defineComponent({
  name: "StsSiderTrigger",
  components: {},
  setup() {
    const { getCollapsed, toggleCollapsed } = useMenuSetting();

    return {
      getCollapsed,
      toggleCollapsed,
    };
  },
});
</script>

<style lang="less">
.trigger {
  font-size: 18px;
  line-height: 1.5715;
  padding: 0 15px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
