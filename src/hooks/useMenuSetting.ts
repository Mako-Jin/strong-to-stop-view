import { computed, unref } from "vue";
import { useInstalledMenuStore } from "../store/modules/menuStore";

export function useMenuSetting() {
  const menuStore = useInstalledMenuStore();

  // 侧边菜单是否折叠
  const getCollapsed = computed(() => menuStore.getCollapsed);
  // 菜单数据来源
  const getMenuSource = computed(() => menuStore.getMenuSource);

  const setCollapsed = (collapsed: boolean) =>
    menuStore.setCollapsed(collapsed);

  const setMenuSource = (menuSource: string) =>
    menuStore.setMenuSource(menuSource);

  const toggleCollapsed = () => {
    setCollapsed(!unref(getCollapsed));
  };

  return {
    getCollapsed,
    getMenuSource,

    toggleCollapsed,
    setMenuSource,
  };
}
