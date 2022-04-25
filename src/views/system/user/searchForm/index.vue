<template>
  <a-form name="advanced_search" :model="formState" @finish="onFinish">
    <a-row :gutter="24" style="margin: 0">
      <a-col v-for="item in userSearch" :key="item.name" :span="8">
        <a-form-item :name="item.name" :label="item.label">
          <a-input
            v-model:value="formState[item.name]"
            :placeholder="item.placeholder"
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
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "UserSearchForm",
  components: {},
  props: {},
  emits: ["filterTableData"],
  setup(props, { emit }) {
    const formState = reactive({});

    const onFinish = () => {
      emit("filterTableData", formState);
    };

    return {
      formState,
      userSearch,

      onFinish,
    };
  },
});

const userSearch = [
  {
    name: "userName",
    label: "用户名",
    placeholder: "请输入用户名",
  },
  {
    name: "phoneNum",
    label: "手机号码",
    placeholder: "请输入手机号",
  },
];
</script>

<style lang="less"></style>
