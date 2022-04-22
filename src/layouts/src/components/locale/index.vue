<template>
  <a-dropdown placement="bottom" :trigger="['click']">
    <span class="layout-header-locale">
      <svg-icon name="i18n" />
    </span>
    <template #overlay>
      <a-menu @click="switchLanguage">
        <div v-for="item in availableLocales" :key="item">
          <a-menu-item :key="item">{{ item }} </a-menu-item>
          <a-menu-divider />
        </div>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { MenuProps } from "ant-design-vue";
import { useInstalledLocaleStore } from "/@/store/modules/localeStore";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "LocaleSwitch",
  components: {},
  setup() {
    const { locale, availableLocales } = useI18n();

    const localeStore = useInstalledLocaleStore();

    const switchLanguage: MenuProps["onClick"] = ({ key }) => {
      localeStore.setCurrentLocale(key.toString());
      locale.value = key.toString();
    };

    return {
      switchLanguage,
      availableLocales,
    };
  },
});
</script>

<style lang="less">
.layout-header-locale {
  display: flex;
  cursor: pointer;
  align-items: center;
  // padding: 3px 5px 0;
}
</style>
