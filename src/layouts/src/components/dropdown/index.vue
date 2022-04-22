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
import { preview } from "/@/apis/fileApi";

export default defineComponent({
  name: "UserDropdown",
  components: {},
  setup() {
    const userStore = useInstalledUserStore();
    const userInfo = userStore.getUserInfo;

    const avatar = ref<string>();

    const getAvatar = async (catalogId: string) => {
      const result = await preview(catalogId).then((res) => {
        return res;
      });
      const avatarUrl = URL.createObjectURL(result);
      if (avatarUrl) {
        avatar.value = avatarUrl;
      }
    };

    getAvatar(userInfo.avatar);

    return {
      userInfo,
      avatar,
      DefaultAvatar,
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
