import { isServer } from "./isServer";

export const checkMacOsX = () => {
    if (isServer) return false;
    return navigator.userAgent.indexOf('Mac OS X') !== -1;
}