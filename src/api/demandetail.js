import $api from './index'

export function getlist (needsId, status, start, length) {
  const url = '/responseForm/getResponseDetailList?needsId=' + needsId + '&status=' + status + '&start=' + start + '&length=' + length

  return $api.get(url)
}

export function addResponse (needsId, projectId, status) {
  const url = `/responseForm/addResponseForm?needsId=${needsId}&projectId=${projectId}&status=${status}`

  return $api.get(url)
}