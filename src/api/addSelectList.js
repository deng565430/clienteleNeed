import $api from './index'

export function sendProject(data) {
  const url = `/needs/add`

  return $api.post(url, data)
}

// 获取发布客源需求列表
export function getaddoptions() {
  const url = `/needs/getaddoptions`

  return $api.get(url)
}
