<template>
  <a-tree-select
    :value="parentId"
    tree-data-simple-mode
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="treeData"
    allow-clear
    :placeholder="$t('common.select')"
    :load-data="onLoadData"
    @change="onChange"
  />
</template>

<script lang="ts">
import { TreeSelectProps } from "ant-design-vue";
import { defineComponent, ref } from "vue";
import { getMenuListByParentId } from "/@/apis/menuApi";
import { MenuModel } from "/@/model/MenuModel";

interface MenuTreeNode {
  id: string;
  title: string;
  value: string;
  pId: string;
  key: string;
}

export default defineComponent({
  name: "MenuTreeSelect",
  components: {},
  props: {
    parentId: {
      type: String,
      default: "",
    },
  },
  emits: ["update:parentId"],
  setup(_props, { emit }) {
    const treeData = ref<TreeSelectProps["treeData"]>([]);

    getMenuListByParentId("").then((res) => {
      res.forEach((item) => {
        treeData.value = treeData.value?.concat({
          id: item.menuId,
          pId: item.parentId,
          value: item.menuId,
          title: item.menuName,
        });
      });
    });
    const onLoadData = async (treeNode: MenuTreeNode) => {
      const menuData: MenuModel[] = await getMenuListByParentId(
        treeNode.id
      ).then((res) => {
        return res;
      });
      return new Promise((resolve) => {
        if (!menuData) {
          resolve(false);
        }
        menuData.forEach((item) => {
          if (item.menuType !== 3) {
            treeData.value = treeData.value?.concat({
              id: item.menuId,
              pId: item.parentId,
              value: item.menuId,
              title: item.menuName,
            });
          }
        });
        resolve(true);
      });
    };

    const onChange = (value: string) => {
      emit("update:parentId", value);
    };

    return {
      treeData,

      onLoadData,
      onChange,
    };
  },
});
</script>

<style lang="less"></style>
