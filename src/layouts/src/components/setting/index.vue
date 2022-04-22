<template>
  <a-button type="text" class="setting-button" @click="visible = true">
    <svg-icon name="setting" />
  </a-button>
  <a-drawer
    :width="500"
    :title="$t('layout.header.setting.title')"
    :visible="visible"
    placement="left"
    @close="visible = false"
  >
    <template #extra>
      <a-button style="margin-right: 8px" @click="visible = false">
        Cancel
      </a-button>
      <a-button type="primary" @click="visible = false">Submit</a-button>
    </template>
    <p>Some contents...</p>
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SettingDrawer",
  components: {},
  setup() {
    const visible = ref<boolean>(false);

    return {
      visible,
    };
  },
});
</script>

<style lang="less">
.setting-button {
  padding: 4px 20px 0px 0px;
}
</style>
