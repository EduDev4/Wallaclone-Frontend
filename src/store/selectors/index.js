export const getAuthUser = state => state.auth;

export const getIsLoggedUser = state => state.auth.isLogged;
export const getUsername = state => state.auth.currentUsername;
export const getUserEmail = state => state.auth.currentEmail;

export const getUi = state => state.ui;

export const getAdvertDetail = state => state.adverts.adDetail;
