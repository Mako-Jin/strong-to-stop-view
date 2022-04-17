import { computed, unref } from "vue";
import { useInstalledMenuStore } from "../store/modules/menuStore";

export function useMenuSetting() {
  const menuStore = useInstalledMenuStore();

  // 侧边菜单是否折叠
  const getCollapsed = computed(() => menuStore.getCollapsed);
  // 侧边菜单栏宽度
  // const getMenuWidth = computed(() => menuStore.getMenuWidth);

  const setCollapsed = (collapsed: boolean) =>
    menuStore.setCollapsed(collapsed);

  const toggleCollapsed = () => {
    setCollapsed(!unref(getCollapsed));
  };

  return {
    getCollapsed,
    // getMenuWidth,

    toggleCollapsed,
  };
}
