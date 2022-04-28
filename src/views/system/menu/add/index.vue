<template>
  <a-modal
    :visible="visible"
    :title="$t('menu.add.title')"
    :ok-text="$t('common.save')"
    :cancel-text="$t('common.reset')"
    :confirm-loading="confirmLoading"
    @ok="saveMenu"
    @cancel="$emit('update:visible', false)"
  >
    <a-form
      ref="menuFormRef"
      :model="menuFormState"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item name="parentId" label="父级菜单">
        <menu-tree-select v-model:parentId="menuFormState.parentId" />
      </a-form-item>
      <a-form-item name="menuName" label="菜单名称" required>
        <a-input v-model:value="menuFormState.menuName" />
      </a-form-item>
      <a-form-item name="menuUrl" label="菜单地址" required>
        <a-input v-model:value="menuFormState.menuUrl" />
      </a-form-item>
      <a-form-item name="menuDesc" label="菜单描述" required>
        <a-input v-model:value="menuFormState.menuDesc" />
      </a-form-item>
      <a-form-item name="menuType" label="菜单类别" required>
        <a-radio-group v-model:value="menuFormState.menuType">
          <a-radio value="1">菜单</a-radio>
          <a-radio value="2">页面</a-radio>
          <a-radio value="3">操作</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item name="menuStatus" label="菜单状态" required>
        <a-switch
          v-model:checked="menuFormState.menuStatus"
          checked-children="启用"
          :checked-value="1"
          un-checked-children="禁用"
          :un-checked-value="2"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { FormInstance } from "ant-design-vue";
import { defineComponent, reactive, ref } from "vue";
import MenuTreeSelect from "./treeSelect/index.vue";
import { MenuModel } from "/@/model/MenuModel";

export default defineComponent({
  name: "AddMenuModal",
  components: {
    MenuTreeSelect,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:visible", "createMenu"],
  setup(_props, { emit }) {
    const confirmLoading = ref<boolean>(false);

    const menuFormRef = ref<FormInstance>();
    const menuFormState = reactive<MenuModel>({
      menuId: "",
      menuName: "",
      menuUrl: "",
      menuDesc: "",
      menuType: 1,
      menuLevel: 1,
      menuStatus: 1,
      sort: 0,
      isNeedAuthorized: 2,
      isSecret: 2,
    });

    const saveMenu = () => {
      confirmLoading.value = true;
      menuFormRef.value
        ?.validateFields()
        .then((values) => {
          emit("createMenu", values);
          confirmLoading.value = false;
        })
        .catch(() => {
          confirmLoading.value = false;
        });
    };

    return {
      menuFormRef,
      menuFormState,
      confirmLoading,

      saveMenu,
    };
  },
});
</script>

<style lang="less"></style>
