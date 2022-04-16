import { WebStorage } from "./WebStorage";

export const SessionStorage = new WebStorage(sessionStorage);

export const LocalStorage = new WebStorage(localStorage);
