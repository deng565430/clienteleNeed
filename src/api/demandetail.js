import $api from './index'

export function getlist (needsId, status, start, length) {
  const url = '/responseForm/getResponseDetailList?needsId=' + needsId + '&status=' + status + '&start=' + start + '&length=' + length

  return $api.get(url)
}

export function addResponse (needsId, projectId, status) {
  const url = '/responseForm/addResponseForm'

  const data = {
    needsId,
    projectId,
    status
  }
  return $api.get(url, data)
}