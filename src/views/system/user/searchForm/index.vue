<template>
  <a-form
    ref="formRef"
    name="advanced_search"
    :model="formState"
    @finish="$emit('filterTableData', $event)"
  >
    <a-row :gutter="24" style="margin: 0">
      <a-col v-for="item in userSearch" :key="item.name" :span="8">
        <a-form-item :name="item.name" :label="$t(item.label)">
          <a-input
            v-model:value="formState[item.name]"
            :placeholder="$t(item.placeholder)"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-button type="primary" html-type="submit">
          {{ $t("common.search") }}
        </a-button>
        <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">
          {{ $t("common.reset") }}
        </a-button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
import { FormInstance } from "ant-design-vue";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "UserSearchForm",
  components: {},
  props: {},
  emits: ["filterTableData"],
  setup() {
    const formRef = ref<FormInstance>();
    const formState = reactive({});

    return {
      formRef,
      formState,
      userSearch,
    };
  },
});

const userSearch = [
  {
    name: "username",
    label: "user.form.username",
    placeholder: "user.form.username_placeholder",
  },
  {
    name: "phoneNum",
    label: "user.form.phoneNum",
    placeholder: "user.form.phoneNum_placeholder",
  },
];
</script>

<style lang="less"></style>
