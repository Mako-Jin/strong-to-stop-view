import { Router } from "vue-router";
import { createPermissionGuard } from "./modules/permissionGuard";

export function setupRouterGuard(router: Router) {
  createPermissionGuard(router);
}
