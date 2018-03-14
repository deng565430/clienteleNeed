import $api from './index'

// 省
export function getProvincelist() {
  const url = `/projectnewest/getprovince`

  return $api.get(url)
}

// 市
export function getCitylist(data) {
  const url = `/projectnewest/getcity?proCode=${data}`

  return $api.get(url)
}

// 区
export function getDistirctlist(province, city) {
  const url = `/projectnewest/getdistrict?cityCode=${city}`

  return $api.get(url)
}

// 物业类型
export function getTypeList() {
  const url = '/projectnewest/getwuye'

  return $api.get(url)
}
