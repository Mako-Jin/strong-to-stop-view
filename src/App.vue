<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { useI18n } from "vue-i18n";
import { useInstalledLocaleStore } from "./store/modules/localeStore";

const { locale } = useI18n();

const switchLanguage = (language: string) => {
  const localeStore = useInstalledLocaleStore();
  localeStore.setCurrentLocale(language);
  locale.value = language;
};
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <svg-icon name="user" />
  <button @click="switchLanguage('en_US')">
    切换语言测试: {{ $t("common.save") }}
  </button>
  <div>项目名称 : {{ $t("project.title") }}</div>
</template>

<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
