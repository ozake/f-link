const Store = () => import('./component/Store.vue')
const StoreView = () => import('./StoreView.vue')
const Main = () => import('./Main.vue')
const Franchise = () => import('./Franchise.vue')
const FranchiseList = () => import('./FranchiseList.vue')
const FranchiseView = () => import('./FranchiseView.vue')
const ThemeBest = () => import('./ThemeBest.vue')
const SnsBest = () => import('./SnsBest.vue')
const sCapitalBest = () => import('./sCapitalBest.vue')
const SteadyBest = () => import('./SteadyBest.vue')
const GrowthBest = () => import('./GrowthBest.vue')
const SalesView = () => import('./SalesView.vue')
const EstateList = () => import('./eatateListC.vue')

export default [
  {
    path: '/',
    name: 'home-page',
    component: Main
  },
  {
    path: '/store',
    name: 'store-page',
    component: Store,
    children: [
      {
        path: ':addr',
        name: 'store-search',
        props: true,
        component: Store
      }
    ]
  },
  {
    path: '/storeView/:categoryCode/:storeName/:id',
    name: 'store-view',
    component: StoreView
  },
  {
    path: '/franchise',
    component: Franchise,
    name: 'franchise-default',
    children: [
      {
        path: ':categoryCode',
        name: 'franchise-list',
        props: true,
        component: Franchise
      }
    ]
  },
  {
    path: '/franchiseList',
    name: 'franchise-list-default',
    component: FranchiseList,
    children: [
      {
        path: ':categoryCode/:page',
        name: 'franchise-list-page',
        props: true,
        component: FranchiseList,
        children: [
          {
            path: ':minprice/:maxprice',
            name: 'franchise-list-mnpage',
            props: true,
            component: FranchiseList,
          }
        ]
      },
    ]
  },
  {
    path: '/franchiseView/:id',
    name: 'franchise-view',
    component: FranchiseView
  },
  {
    path: '/themeBest',
    name: 'theme-best',
    component: ThemeBest
  },
  {
    path: '/snsBest/:categoryCode',
    name: 'sns-best',
    component: SnsBest,
    children: [
      {
        path: ':page',
        name: 'sns-list',
        props: true,
        component: SnsBest
      }
    ]
  },
  {
    path: '/scapitalBest/:categoryCode',
    name: 'scapital-default',
    component: sCapitalBest,
    children: [
      {
        path: ':page',
        name: 'scapital-list',
        props: true,
        component: sCapitalBest
      }
    ]
  },
  {
    path: '/steadyBest/:categoryCode',
    name: 'steady-default',
    component: SteadyBest,
    children: [
      {
        path: ':page',
        name: 'steady-list',
        props: true,
        component: SteadyBest
      }
    ]
  },
  {
    path: '/growthBest/:categoryCode',
    name: 'growth-default',
    component: GrowthBest,
    children: [
      {
        path: ':page',
        name: 'growth-list',
        props: true,
        component: GrowthBest
      }
    ]
  },
  {
    path: '/salesView/:id',
    name: 'sales-view',
    component: SalesView
  },
  {
    path: '/estateList/:page/:code',
    name: 'estate-list',
    component: EstateList
  },
  {
    path: '*',
    redirect: '/'
  }
]
