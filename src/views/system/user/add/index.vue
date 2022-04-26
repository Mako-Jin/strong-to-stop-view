<template>
  <a-modal
    :visible="visible"
    :title="$t('user.add.title')"
    :confirm-loading="state.confirmLoading"
    @cancel="$emit('update:visible', false)"
  >
    <template #footer>
      <a-button key="reset" @click="handleReset">
        {{ $t("common.reset") }}
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="state.loading"
        @click="handleOk"
      >
        {{ $t("common.save") }}
      </a-button>
    </template>
    <a-form
      ref="formRef"
      :model="state.formState"
      :label-col="state.labelCol"
      :rules="rules"
      name="form_in_modal"
    >
      <a-row type="flex" justify="space-around" align="middle">
        <a-col flex="140px">
          <a-form-item name="avatar">
            <a-upload
              name="files"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              :customRequest="upload"
              @change="handleChange"
            >
              <div v-if="state.avatarThumbUrl">
                <a-image
                  :src="state.avatarThumbUrl"
                  alt="avatar"
                  width="100%"
                />
              </div>
              <div v-else>
                <svg-icon v-if="state.loading" name="loading" />
                <svg-icon v-else name="upload-image" size="30" />
                <div class="ant-upload-text">
                  {{ $t("user.add.form.upload_avatar") }}
                </div>
              </div>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :flex="3">
          <a-form-item
            name="username"
            class="height-50"
            :label="$t('user.add.form.username')"
          >
            <a-input
              v-model:value="state.formState.username"
              :placeholder="$t('user.add.form.username_placeholder')"
            />
          </a-form-item>
          <a-form-item
            name="nickName"
            class="height-50"
            :label="$t('user.add.form.nickName')"
            :rules="[
              {
                required: true,
                message: $t('user.add.form.nickName_require'),
              },
            ]"
          >
            <a-input
              v-model:value="state.formState.nickName"
              :placeholder="$t('user.add.form.nickName_placeholder')"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item name="phoneNum" :label="$t('user.add.form.phone')">
        <a-input
          v-model:value="state.formState.phoneNum"
          :placeholder="$t('user.add.form.phone_placeholder')"
        />
      </a-form-item>
      <a-form-item name="emailAddress" :label="$t('user.add.form.email')">
        <a-input
          v-model:value="state.formState.emailAddress"
          :placeholder="$t('user.add.form.email_placeholder')"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { RuleObject } from "ant-design-vue/lib/form";
import { FormInstance } from "ant-design-vue/es/form";
import {
  checkChineseSymbol,
  fileIsImage,
  isEmail,
  isPhoneNum,
} from "/@/utils/TypeUtils";
import { FileItem } from "/@/model/FileModel";
import { message } from "ant-design-vue";
import { getPreviewImage, sliceUpload } from "/@/service/fileService";
import i18n from "/@/locales";

export default defineComponent({
  name: "AddUserModal",
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:visible", "createUser"],
  setup(_props, { emit }) {
    const formRef = ref<FormInstance>();
    const state = reactive({
      confirmLoading: false,
      loading: false,
      avatarThumbUrl: "",
      formState: {
        userId: "",
        username: "",
        nickName: "",
        avatar: "",
        phoneNum: "",
        emailAddress: "",
      },
      labelCol: { style: { width: "70px" } },
    });

    const handleOk = () => {
      state.confirmLoading = true;
      formRef.value
        ?.validateFields()
        .then((values) => {
          emit("createUser", values);
          state.confirmLoading = false;
        })
        .catch(() => {
          state.confirmLoading = false;
        });
    };

    const handleReset = () => {
      formRef.value?.resetFields();
    };

    const beforeUpload = (file: FileItem) => {
      if (!fileIsImage(file.type)) {
        message.error("You can only upload image file!");
        return false;
      } else if (file.size / 1024 / 1024 > 2) {
        message.error("Image must smaller than 2MB!");
        return false;
      }
    };

    const upload = async (options: any) => {
      state.formState.avatar = await sliceUpload(
        options.file,
        options.onProgress,
        options.onSuccess,
        options.onError
      ).then((res) => {
        return res;
      });
      await getPreviewImage(state.formState.avatar).then((res) => {
        state.avatarThumbUrl = res;
      });
    };

    const handleChange = (file: FileItem) => {
      state.loading = file.status === "uploading";
    };

    return {
      state,
      formRef,
      rules,
      getPreviewImage,
      handleOk,
      handleReset,
      beforeUpload,
      handleChange,
      upload,
    };
  },
});

const validateUsername = async (_rule: RuleObject, value: string) => {
  if (value === "") {
    return Promise.reject(i18n.global.t("user.add.form.username_require"));
  }
  if (checkChineseSymbol(value)) {
    return Promise.reject(i18n.global.t("user.add.form.username_check"));
  }
  return Promise.resolve();
};

const validatePhoneNum = async (_rule: RuleObject, value: string) => {
  if (value === "") {
    return Promise.reject(i18n.global.t("user.add.form.phone_require"));
  }
  if (!isPhoneNum(value)) {
    return Promise.reject(i18n.global.t("user.add.form.phone_check"));
  }
  return Promise.resolve();
};

const validateEmailAddress = async (_rule: RuleObject, value: string) => {
  if (value === "") {
    return Promise.reject(i18n.global.t("user.add.form.email_require"));
  }
  if (!isEmail(value)) {
    return Promise.reject(i18n.global.t("user.add.form.email_check"));
  }
  return Promise.resolve();
};

const rules = {
  username: [
    { required: true, validator: validateUsername, trigger: "change" },
  ],
  phoneNum: [
    { required: true, validator: validatePhoneNum, trigger: "change" },
  ],
  emailAddress: [
    { required: true, validator: validateEmailAddress, trigger: "change" },
  ],
};
</script>

<style lang="less">
.collection-create-form_last-form-item {
  margin-bottom: 0;
}

.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 2px;
  color: #666;
}
</style>
