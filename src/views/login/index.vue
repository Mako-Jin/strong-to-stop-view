<template>
  <div class="login-container">
    <div class="form-container">
      <a-form class="login-form" :model="loginFormState" :rules="rules">
        <span class="login-form-header">
          {{ $t("login.form.title") }}
        </span>
        <a-form-item class="login-form-item" name="username">
          <span class="input-label">{{ $t("login.form.username") }}</span>
          <a-input
            v-model:value="loginFormState.username"
            class="login-form-input"
            autocomplete="off"
            :placeholder="$t('login.form.username_placeholder')"
            :bordered="false"
            size="default"
          />
          <div class="focus-input"></div>
          <svg-icon class="login-form-prefix" name="user-2" :size="22" />
          <svg-icon
            v-if="loginFormState.username"
            class="login-form-suffix"
            name="close"
            :size="18"
            @click="loginFormState.username = ''"
          />
        </a-form-item>
        <a-form-item class="login-form-item" name="password">
          <span class="input-label">{{ $t("login.form.password") }}</span>
          <a-input
            v-model:value="loginFormState.password"
            autocomplete="off"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="$t('login.form.password_placeholder')"
            class="login-form-input"
            :bordered="false"
            size="default"
          />
          <div class="focus-input"></div>
          <svg-icon class="login-form-prefix" name="lock" :size="22" />
          <svg-icon
            v-if="loginFormState.password && !showPassword"
            class="login-form-suffix"
            name="eye"
            :size="18"
            @click="showPassword = !showPassword"
          />
          <svg-icon
            v-if="loginFormState.password && showPassword"
            class="login-form-suffix"
            name="eye-close"
            :size="18"
            @click="showPassword = !showPassword"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 19, span: 24 }">
          <a-button type="link" style="padding-bottom: 31px">
            {{ $t("login.form.forget_password") }}
          </a-button>
        </a-form-item>
        <div class="login-form-footer">
          <div class="login-form-btn-container">
            <div class="login-form-btn-bg"></div>
            <a-button class="login-form-button" html-type="submit">
              {{ $t("login.form.login_button") }}
            </a-button>
          </div>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import type { Rule } from "ant-design-vue/es/form";
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { LoginModel } from "/@/model/UserModel";

export default defineComponent({
  name: "Login",
  components: {},
  setup() {
    const i18n = useI18n();

    const loginFormState = reactive<LoginModel>({
      username: "",
      password: "",
      authType: "",
    });

    const showPassword = ref<boolean>(false);

    const validateUsername = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject(i18n.t("login.form.username_placeholder"));
      }
      return Promise.resolve();
    };

    const validatePassword = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject(i18n.t("login.form.password_placeholder"));
      }
      return Promise.resolve();
    };

    const rules = {
      username: [
        { required: true, validator: validateUsername, trigger: "change" },
      ],
      password: [
        { required: true, validator: validatePassword, trigger: "change" },
      ],
    };

    return {
      loginFormState,
      showPassword,
      rules,
    };
  },
});
</script>

<style lang="less">
@import "/@/styles/login.less";
</style>
