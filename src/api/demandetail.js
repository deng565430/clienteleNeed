import $api from './index'

export function getlist (needsId, status) {
  const url = '/responseForm/getResponseDetailList?needsId=' + needsId + '&status=' + status

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