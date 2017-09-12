const RecommendList = (resolve) => {
  import('components/recommendList/recommendList').then((module) => {
    resolve(module)
  })
}

const Details = (resolve) => {
  import('components/details/details').then((module) => {
    resolve(module)
  })
}

const AddProject = (resolve) => {
  import('components/addProject/addProject').then((module) => {
    resolve(module)
  })
}

export default [
  {
    path: '/',
    component: RecommendList
  }, {
    path: '/recommend',
    component: RecommendList,
    name: 'recommendList'
  }, {
    path: '/addProject',
    name: 'addProject',
    component: AddProject
  }, {
    path: '/detail/:pro',
    name: 'detail',
    component: Details
  }
]
