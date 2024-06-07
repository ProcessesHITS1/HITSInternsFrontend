export const selectAuthInfo = (state: RootState) => state.auth
export const selectUserId = (state: RootState) => state.auth.userid
export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth
