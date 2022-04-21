import { computed, unref } from "vue";
import { useInstalledMenuStore } from "../store/modules/menuStore";

export function useMenuSetting() {
  const menuStore = useInstalledMenuStore();

  // 侧边菜单是否折叠
  const getCollapsed = computed(() => menuStore.getCollapsed);
  // 菜单数据来源
  const getMenuSource = computed(() => menuStore.getMenuSource);
  // 菜单选中状态
  const getSelectedKeys = computed(() => menuStore.getSelectedKeys);
  // 菜单折叠状态
  const getOpenKeys = computed(() => menuStore.getOpenKeys);

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
    getOpenKeys,
    getSelectedKeys,

    toggleCollapsed,
    setMenuSource,
  };
}
