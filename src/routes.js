import Store from './component/Store.vue'
import StoreView from './StoreView.vue'
import Main from './Main.vue'
import Franchise from './Franchise.vue'
import FranchiseList from './FranchiseList.vue'
import FranchiseView from './FranchiseView.vue'
import ThemeBest from './ThemeBest.vue'
import SnsBest from './SnsBest.vue'
import sCapitalBest from './sCapitalBest.vue'
import SteadyBest from './SteadyBest.vue'
import GrowthBest from './GrowthBest.vue'
//import CounterPage from 'components/CounterPage'

export default [
  {
    path: '/',
    name: 'home-page',
    component: Main
  },
  {
    path: '/store',
    name: 'store-page',
    component: Store
  },
  {
    path: '/storeView/:id',
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
    name: 'franchise-list',
    component: FranchiseList
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
    path: '/snsBest',
    name: 'sns-best',
    component: SnsBest
  },
  {
    path: '/scapitalBest',
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
    path: '/steadyBest',
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
    path: '/growthBest',
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
    path: '*',
    redirect: '/'
  }
]
