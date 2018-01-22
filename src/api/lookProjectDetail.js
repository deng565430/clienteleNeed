import $api from './index'

export function getProject(id) {
  const url = `/needs/getneedById?needsid=${id}`

  return $api.get(url)
}
