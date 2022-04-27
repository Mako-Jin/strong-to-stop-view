<template>
  <a-page-header style="background-color: #fff">
    <user-search-form @filter-table-data="filterTableData" />
    <div style="display: flex">
      <a-button
        type="primary"
        style="margin: 8px"
        @click="state.addUserModalVisible = true"
      >
        <template #icon>
          <svg-icon name="user-add" style="margin-right: 8px" />
        </template>
        {{ $t("user.button.create") }}
      </a-button>
      <a-button type="primary" danger style="margin: 8px"> 批量删除 </a-button>
    </div>
    <user-table
      :dataSource="state.dataSource"
      :loading="state.loading"
      :pagination="state.pagination"
      @switch-page="switchPage"
      @on-delete-user="onDeleteUserByUserId"
      @show-edit-user-drawer="showEditUserDrawer"
    />
  </a-page-header>
  <add-user-modal
    v-model:visible="state.addUserModalVisible"
    @create-user="createUser"
  />
  <suspense>
    <template #default>
      <edit-user-drawer
        v-if="state.editUserDrawerVisible"
        v-model:visible="state.editUserDrawerVisible"
        :userId="state.userId"
        @update-user="updateUser"
      />
    </template>
    <template #fallback>
      <div>
        <h3>{{ $t("common.loading") }}</h3>
      </div>
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import UserSearchForm from "./searchForm/index.vue";
import UserTable from "./table/index.vue";
import AddUserModal from "./add/index.vue";
import EditUserDrawer from "./edit/index.vue";
import {
  deleteUserByUserId,
  getUserPageList,
  saveUser,
  updateUserByUserId,
} from "/@/apis/userApi";
import { UserModel } from "/@/model/UserModel";
import { DefaultPagination } from "/@/config/CommonConfig";
import { getPreviewImage } from "/@/service/fileService";

export default defineComponent({
  name: "UserMgr",
  components: {
    UserSearchForm,
    UserTable,
    AddUserModal,
    EditUserDrawer,
  },
  setup() {
    const state = reactive({
      userId: "",
      dataSource: [],
      conditions: {},
      loading: false,
      addUserModalVisible: false,
      editUserDrawerVisible: false,
      pagination: DefaultPagination,
    });

    const getUserDataList = async () => {
      const { current, pageSize: size } = state.pagination;
      state.loading = true;
      const result = await getUserPageList(size, current, state.conditions)
        .then((res) => {
          return res;
        })
        .catch();
      state.loading = false;
      if (result) {
        const { totalCount, dataList } = result[0];
        state.dataSource = dataList;
        state.pagination.total = totalCount;
      }
      state.dataSource.forEach(async (user: UserModel) => {
        await getPreviewImage(user.avatar).then((res) => {
          user.avatar = res;
        });
      });
    };

    getUserDataList();

    const switchPage = (pagination: any) => {
      state.pagination.current = pagination.current;
      state.pagination.pageSize = pagination.pageSize;
      getUserDataList();
    };

    const filterTableData = (values: any) => {
      state.conditions = values;
      getUserDataList();
    };

    const createUser = async (user: UserModel) => {
      await saveUser(user).then(() => {
        state.addUserModalVisible = false;
        getUserDataList();
      });
    };

    const onDeleteUserByUserId = async (userId: string) => {
      await deleteUserByUserId(userId);
      getUserDataList();
    };

    const showEditUserDrawer = (userId: string) => {
      state.userId = userId;
      state.editUserDrawerVisible = true;
    };

    const updateUser = async (user: UserModel) => {
      await updateUserByUserId(user).then(() => {
        state.editUserDrawerVisible = false;
        getUserDataList();
      });
    };

    return {
      state,
      switchPage,
      filterTableData,
      createUser,
      onDeleteUserByUserId,
      showEditUserDrawer,
      updateUser,
    };
  },
});
</script>

<style lang="less"></style>
