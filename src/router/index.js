const RecommendList = (resolve) => {
  import('components/recommendList/recommendList').then((module) => {
    resolve(module)
  })
}

const AddProject = (resolve) => {
  import('components/addProject/addProject').then((module) => {
    resolve(module)
  })
}

const DemandDetail = (resolve) => {
  import('components/demandDetail/demandetail').then((module) => {
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
    path: '/demandetail/:id/:status',
    name: 'demandetail',
    component: DemandDetail
  }
]
