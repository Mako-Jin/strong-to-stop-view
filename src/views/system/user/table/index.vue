<template>
  <a-table
    :row-key="(record) => record.userId"
    class="ant-table-striped"
    size="middle"
    :columns="userTableColumns"
    :data-source="dataSource"
    :row-class-name="
      (_record, index) => (index % 2 === 1 ? 'table-striped' : null)
    "
    bordered
    :pagination="pagination"
    @change="$emit('switchPage', $event)"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'avatar'">
        <a-image width="25px" :src="record.avatar" />
      </template>
      <template v-if="column.key === 'action'">
        <div class="editable-row-operations">
          <a-button
            type="link"
            style="padding: 0"
            @click="$emit('showEditUserDrawer', record.userId)"
          >
            {{ $t("common.edit") }}
          </a-button>
          <a-divider type="vertical" />
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="$emit('onDeleteUser', record.userId)"
          >
            <a-button type="link" style="padding: 0">
              {{ $t("common.delete") }}
            </a-button>
          </a-popconfirm>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { PaginationProps } from "ant-design-vue";
import { defineComponent, PropType } from "vue";
import { UserModel } from "/@/model/UserModel";

export default defineComponent({
  name: "UserTable",
  components: {},
  props: {
    dataSource: {
      type: Array as PropType<UserModel[]>,
      default: null,
    },
    pagination: {
      type: [Object, Boolean] as PropType<PaginationProps | boolean>,
      default: null,
    },
  },
  emits: ["switchPage", "onDeleteUser", "showEditUserDrawer"],
  setup() {
    return {
      userTableColumns,
    };
  },
});

const userTableColumns = [
  {
    title: "头像",
    dataIndex: "avatar",
    key: "avatar",
  },
  {
    title: "昵称",
    dataIndex: "nickName",
    key: "nickName",
  },
  {
    title: "账号",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "手机号",
    dataIndex: "phoneNum",
    key: "phoneNum",
  },
  {
    title: "邮箱",
    dataIndex: "emailAddress",
    key: "emailAddress",
  },
  {
    title: "创建者",
    dataIndex: "createUser",
    key: "createUser",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    customRender: (text: any) => {
      return dayjs(text.value).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    title: "更新者",
    dataIndex: "updateUser",
    key: "updateUser",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
    key: "updateTime",
    customRender: (text: any) => {
      return dayjs(text.value).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  {
    title: "操作",
    key: "action",
    dataIndex: "action",
  },
];
</script>

<style lang="less" scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
</style>
