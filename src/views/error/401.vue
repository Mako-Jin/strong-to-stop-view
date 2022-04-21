<template>
  <a-result status="401" title="401" sub-title="Sorry, you are not sign in.">
    <template #extra>
      <a-button type="primary">Back Home</a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "",
  components: {},
  setup() {
    return {};
  },
});
</script>

<style lang="less"></style>
