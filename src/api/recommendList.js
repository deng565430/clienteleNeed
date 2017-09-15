import $api from './index'

export function getTypeList () {
  const url = '/pro/getwuye'

  return $api.get(url)
}

export function getProvincelist () {
  const url = '/pro/getProvincelist'

  return $api.get(url)
}

export function getDistirctlist (province, city) {
  const url = '/pro/getDistirctlist'

  const data = {
    province,
    city
  }

  return $api.post(url, data)
}

export function getCitylist (data) {
  const url = `/pro/getCitylist?city=${data}`

  return $api.post(url)
}

export function getJurisdictiont (data) {
  const url = '/user/getUserbyid'

  return $api.get(url)
}

export function getUserbyid () {
  const url = '/user/getUserbyid'

  return $api.get(url)
}

export function getTimeData (num) {
  const url = `/needs/getneedsreply/${num}`

  return $api.get(url)
}

export function getNeedsName (num) {
  const url = `/needs/getneedsname`

  return $api.get(url)
}

export function setNeedsItem (data) {
  const url = '/needs/getneedsitem'

  return $api.post(url, data)
}

export function stopNeeds (data) {
  const url = `/needs/stopneeds/${data}`

  return $api.post(url)
}