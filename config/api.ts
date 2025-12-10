// Central API configuration
export const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_HOST || "http://localhost:3000";

export const endpoints = {
  auth: {
    // Better Auth is served via Expo Router API route under baseURL/api/auth/*
    // No custom endpoints required unless you proxy.
    // Your custom endpoints below are independent of Better Auth.
    login: `${BASE_URL}/auth/login`,
    logout: `${BASE_URL}/auth/logout`,
    me: `${BASE_URL}/auth/me`,
    verifyEmail: `${BASE_URL}/auth/verify-email`,
    sendPhoneOtp: `${BASE_URL}/auth/send-phone-otp`,
    verifyPhone: `${BASE_URL}/auth/verify-phone`,
    oauthStart: `${BASE_URL}/auth/oauth/start`,
    oauthCallback: `${BASE_URL}/auth/oauth/callback`,
  },
  profile: {
    get: `${BASE_URL}/users/me`,
    update: `${BASE_URL}/users/me`,
  },
  addresses: {
    list: `${BASE_URL}/addresses`,
    add: `${BASE_URL}/addresses`,
    update: (id: string) => `${BASE_URL}/addresses/${id}`,
    remove: (id: string) => `${BASE_URL}/addresses/${id}`,
  },
  products: {
    categories: `${BASE_URL}/categories`,
    recommendations: `${BASE_URL}/products/recommendations`,
    byCategory: (key: string) =>
      `${BASE_URL}/products?category=${encodeURIComponent(key)}`,
    details: (id: string) => `${BASE_URL}/products/${id}`,
    discounts: `${BASE_URL}/discounts/current`,
  },
  favorites: {
    add: (id: string) => `${BASE_URL}/favorites/${id}`,
    remove: (id: string) => `${BASE_URL}/favorites/${id}`,
    list: `${BASE_URL}/favorites`,
  },
  cart: {
    get: `${BASE_URL}/cart`,
    addItem: `${BASE_URL}/cart/items`,
    updateItem: (id: string) => `${BASE_URL}/cart/items/${id}`,
    removeItem: (id: string) => `${BASE_URL}/cart/items/${id}`,
    checkout: `${BASE_URL}/orders/checkout`,
  },
  orders: {
    list: `${BASE_URL}/orders`,
    details: (id: string) => `${BASE_URL}/orders/${id}`,
  },
};
