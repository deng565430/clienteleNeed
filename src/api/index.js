import featch from '../config/fetch'

const $api = {
  get: function (url, data) {
    return featch(url, data, 'GET')
  },
  post: function (url, data) {
    return featch(url, data, 'POST')
  }
}

export default $api