import $api from './index'

export function getlist (data) {
  const url = '/responseForm/getResponseDetailList'

  return $api.get(url, data)
}

export function addResponse (needsId, projectId, status) {
  const url = `/responseForm/addResponseForm?needsId=${needsId}&projectId=${projectId}&status=${status}`

  return $api.get(url)
}
