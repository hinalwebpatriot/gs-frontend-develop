export const isAuthSelector = state => state.auth.isAuth;
export const authStatusSelector = state => state.auth.status;
export const modalAuthStatusSelector = state => state.auth.modalAuthStatus;
export const authErrorsSelector = state => state.auth.errors || null;
export const authCheckVerifySelector = state => state.auth.errors.step || null;
