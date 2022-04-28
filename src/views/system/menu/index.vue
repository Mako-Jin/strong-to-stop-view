<template>
  <a-page-header style="background-color: #fff">
    <div style="display: flex">
      <a-button
        type="primary"
        style="margin: 8px"
        @click="addMenuModalVisible = true"
      >
        <template #icon>
          <svg-icon name="menu-add" style="margin-right: 8px" />
        </template>
        {{ $t("menu.button.create") }}
      </a-button>
      <a-button
        type="primary"
        style="margin: 8px"
        @click="addMenuModalVisible = true"
      >
        <template #icon
          ><svg-icon name="data-import" style="margin-right: 8px"
        /></template>
        {{ $t("common.data_import") }}
      </a-button>
    </div>
    <menu-table
      :dataSource="menuTreeList"
      @on-delete-menu="onDeleteMenuByMenuId"
    />
  </a-page-header>
  <add-menu-modal
    v-model:visible="addMenuModalVisible"
    @create-menu="createMenu"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { deleteMenuByMenuId, getMenuTreeList, saveMenu } from "/@/apis/menuApi";
import MenuTable from "./table/index.vue";
import addMenuModal from "./add/index.vue";
import { MenuModel } from "/@/model/MenuModel";

export default defineComponent({
  name: "MenuMgr",
  components: {
    MenuTable,
    addMenuModal,
  },
  setup() {
    const addMenuModalVisible = ref<boolean>(false);
    const loading = ref<boolean>(false);

    const menuTreeList = ref([]);

    const getMenuDataList = async () => {
      loading.value = true;
      const menuData = await await getMenuTreeList().then((res) => {
        return res;
      });
      loading.value = false;
      if (menuData) {
        menuTreeList.value = menuData;
      }
    };

    getMenuDataList();

    const createMenu = async (menu: MenuModel) => {
      await saveMenu(menu).then(() => {
        addMenuModalVisible.value = false;
        getMenuDataList();
      });
    };

    const onDeleteMenuByMenuId = async (menuId: string) => {
      await deleteMenuByMenuId(menuId);
      getMenuDataList();
    };

    return {
      menuTreeList,
      addMenuModalVisible,

      createMenu,
      onDeleteMenuByMenuId,
    };
  },
});
</script>

<style lang="less"></style>
