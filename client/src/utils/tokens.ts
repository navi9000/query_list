const PROJECT_BASE = "query-list::"

const REFRESH_TOKEN_KEY = PROJECT_BASE + "refresh-token"

export const readRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const storeRefreshToken = (value: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, value)
}

export const clearRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}
