const RecommendList = (resolve) => {
  import('components/recommendList/recommendList').then((module) => {
    resolve(module)
  })
}

const AddProject = (resolve) => {
  import('components/addProject/addSelectList').then((module) => {
    resolve(module)
  })
}

const LookProject = (resolve) => {
  import('components/lookProjectDetail/lookProjectDetail').then((module) => {
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
    component: RecommendList,
    meta: { keepAlive: true }
  }, {
    path: '/recommend/',
    component: RecommendList,
    meta: { keepAlive: true },
    name: 'recommendList'
  }, {
    path: '/addProject/:id',
    name: 'addProject',
    component: AddProject
  }, {
    path: '/lookProject/:id',
    name: 'lookProject',
    component: LookProject
  }, {
    path: '/demandetail/:id/:status',
    name: 'demandetail',
    component: DemandDetail
  }
]
