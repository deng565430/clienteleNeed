// 配置编译环境和线上环境
// baseUrl: 域名地址

let baseUrl
let routerMode = 'hash' // hash history
let imgBaseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://192.168.1.103'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = ''
}

export {
  baseUrl,
  routerMode,
  imgBaseUrl
}