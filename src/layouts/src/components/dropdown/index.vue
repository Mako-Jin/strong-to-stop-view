<template>
  <a-dropdown placement="bottom">
    <span class="layout-header-user-dropdown">
      <img :src="avatar || DefaultAvatar" />
      <span>
        <span class="layout-header-user-dropdown-name">
          {{ userInfo.nickName }}
        </span>
      </span>
    </span>
    <template #overlay>
      <a-menu>
        <a-menu-item key="0">
          {{ $t("layout.header.dropdown.profile") }}
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">
          {{ $t("layout.header.dropdown.logout") }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useInstalledUserStore } from "/@/store/modules/userStore";
import DefaultAvatar from "/@/assets/images/avatar.jpg";
import { getPreviewImage } from "/@/service/fileService";

export default defineComponent({
  name: "UserDropdown",
  components: {},
  setup() {
    const userStore = useInstalledUserStore();
    const userInfo = userStore.getUserInfo;

    const avatar = ref<string>();

    getPreviewImage(userInfo.avatar).then((res) => {
      avatar.value = res;
    });

    return {
      userInfo,
      DefaultAvatar,
      avatar,
    };
  },
});
</script>

<style lang="less">
.layout-header-user-dropdown {
  display: flex;
  padding: 0 10px;
  overflow: hidden;
  font-size: 12px;
  cursor: pointer;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    border-radius: 50%;
  }

  &-name {
    font-size: 14px;
  }
}
</style>
