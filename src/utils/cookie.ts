export const getCookie = (name: string) => {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  const arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  }
  return null
}

export const setCookie = (name: string, value: string, path?: string, domain?: string, secure?: boolean) => {
  let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  if (path) {
    cookieText += `; path=${path}`
  }
  if (domain) {
    cookieText += `; domain=${domain}`
  }
  if (secure) {
    cookieText += '; secure'
  }
  document.cookie = cookieText
}

export const deleteCookie = (name: string, path?: string, domain?: string) => {
  let cookieText = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  if (path) {
    cookieText += `; path=${path}`
  }
  if (domain) {
    cookieText += `; domain=${domain}`
  }
  document.cookie = cookieText
}
