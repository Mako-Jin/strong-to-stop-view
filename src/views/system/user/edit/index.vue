<template>
  <a-drawer
    width="500"
    placement="left"
    :closable="false"
    :title="$t('user.edit.title')"
    :visible="visible"
    @close="$emit('update:visible', false)"
  >
    <template #extra>
      <a-button v-if="!state.editable" type="primary" @click="editUser(true)">
        {{ $t("common.edit") }}
      </a-button>
      <div v-else>
        <a-button type="primary" @click="editUser(false)">
          {{ $t("common.cancel") }}
        </a-button>
        <a-button type="primary" style="margin-left: 8px" @click="saveUser()">
          {{ $t("common.save") }}
        </a-button>
      </div>
    </template>
    <div style="display: flex">
      <div style="width: 24.5%">
        <a-descriptions-item :span="1">
          <a-image :src="state.avatarThumbUrl" />
        </a-descriptions-item>
      </div>
      <div style="width: 75.5%">
        <a-descriptions bordered :column="1">
          <a-descriptions-item label="用户名" :span="1">
            <a-typography-paragraph
              v-model:content="state.userState.username"
              :editable="{ editing: state.editable }"
            >
              <template #editableIcon>{{ null }}</template>
              <template #editableEnterIcon>{{ null }}</template>
            </a-typography-paragraph>
          </a-descriptions-item>
          <a-descriptions-item label="昵称" :span="1">
            <a-typography-paragraph
              v-model:content="state.userState.nickName"
              :editable="{ editing: state.editable }"
            >
              <template #editableIcon>{{ null }}</template>
              <template #editableEnterIcon>{{ null }}</template>
            </a-typography-paragraph>
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </div>
    <a-descriptions bordered :column="2">
      <a-descriptions-item label="性别" :span="1">
        <a-typography-paragraph
          v-model:content="state.userState.gender"
          :editable="{ editing: state.editable }"
        >
          <template #editableIcon>{{ null }}</template>
          <template #editableEnterIcon>{{ null }}</template>
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="年龄" :span="1">
        <a-typography-paragraph
          v-model:content="state.userState.age"
          :editable="{ editing: state.editable }"
        >
          <template #editableIcon>{{ null }}</template>
          <template #editableEnterIcon>{{ null }}</template>
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="手机号" :span="2">
        <a-typography-paragraph
          v-model:content="state.userState.phone"
          :editable="{ editing: state.editable }"
        >
          <template #editableIcon>{{ null }}</template>
          <template #editableEnterIcon>{{ null }}</template>
        </a-typography-paragraph>
      </a-descriptions-item>
      <a-descriptions-item label="邮箱" :span="2">
        <a-typography-paragraph
          v-model:content="state.userState.email"
          :editable="{ editing: state.editable }"
        >
          <template #editableIcon>{{ null }}</template>
          <template #editableEnterIcon>{{ null }}</template>
        </a-typography-paragraph>
      </a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { getUserByUserId } from "/@/apis/userApi";
import { getPreviewImage } from "/@/service/fileService";

export default defineComponent({
  name: "EditUserDrawer",
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      default: "",
    },
  },
  emits: ["update:visible", "updateUser"],
  setup(props, { emit }) {
    const state = reactive({
      editable: false,
      avatarThumbUrl: "",
      userState: {
        userId: "",
        username: "",
        nickName: "",
        gender: "男",
        age: "30",
        avatar: "",
        phone: "",
        email: "",
      },
    });

    const setUserState = () => {
      getUserByUserId(props.userId).then((res) => {
        state.userState.userId = res[0].userId;
        state.userState.username = res[0].username;
        state.userState.nickName = res[0].nickName;
        state.userState.avatar = res[0].avatar;
        state.userState.phone = res[0].phoneNum;
        state.userState.email = res[0].emailAddress;
        getPreviewImage(state.userState.avatar).then((res) => {
          state.avatarThumbUrl = res;
        });
      });
    };

    setUserState();

    const editUser = (value: boolean) => {
      state.editable = value;
    };

    const saveUser = () => {
      emit("updateUser", state.userState);
    };

    return {
      state,
      editUser,
      saveUser,
    };
  },
});
</script>

<style lang="less" scoped>
p {
  font-size: 16px;
  color: rgb(0 0 0 / 85%);
  line-height: 24px;
  display: block;
  margin-bottom: 16px;
  font-weight: bold;
}

div.ant-typography-edit-content {
  left: 0;
  margin-top: 0;
  margin-bottom: 0;
}

div.ant-typography,
.ant-typography p {
  margin-bottom: 0;
}

textarea.ant-input {
  max-width: 90%;
  min-height: 0;
}

.ant-input {
  border: 0 solid #d9d9d9;
  padding: 0;
}
</style>
