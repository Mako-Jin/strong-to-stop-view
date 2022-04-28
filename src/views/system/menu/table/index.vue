<template>
  <a-table
    :columns="menuTableColumns"
    :data-source="dataSource"
    :row-key="(record) => record.menuId"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'menuStatus'">
        <span>
          <a-tag v-if="record.menuStatus == 1" color="green">
            {{ $t("common.enabled") }}
          </a-tag>
          <a-tag v-else color="red">{{ $t("common.disabled") }}</a-tag>
        </span>
      </template>
      <template v-if="column.key === 'action'">
        <span>
          <a-button
            type="link"
            style="padding: 0"
            @click="$emit('showEditMenuDrawer', record.menuId)"
          >
            {{ $t("common.edit") }}
          </a-button>
          <a-divider type="vertical" />
          <a-popconfirm
            v-if="dataSource.length"
            title="Sure to delete?"
            @confirm="$emit('onDeleteMenu', record.menuId)"
          >
            <a-button type="link" style="padding: 0">
              {{ $t("common.delete") }}
            </a-button>
          </a-popconfirm>
        </span>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import dayjs from "dayjs";
import { MenuModel } from "/@/model/MenuModel";

export default defineComponent({
  name: "MenuTable",
  components: {},
  props: {
    dataSource: {
      type: Array as PropType<MenuModel[]>,
      default: null,
    },
  },
  emits: ["onDeleteMenu", "showEditMenuDrawer"],
  setup() {
    return {
      menuTableColumns,
    };
  },
});

const menuTableColumns = [
  {
    title: "菜单名称",
    dataIndex: "menuName",
    key: "menuName",
    ellipsis: true,
  },
  {
    title: "菜单描述",
    dataIndex: "menuDesc",
    key: "menuDesc",
    ellipsis: true,
  },
  {
    title: "菜单地址",
    dataIndex: "menuUrl",
    key: "menuUrl",
  },
  {
    title: "菜单状态",
    dataIndex: "menuStatus",
    key: "menuStatus",
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
