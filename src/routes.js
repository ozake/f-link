import Store from './component/Store.vue'
import Main from './Main.vue'
import Franchise from './Franchise.vue'
import FranchiseList from './FranchiseList.vue'
import FranchiseView from './FranchiseView.vue'
import ThemeBest from './ThemeBest.vue'
import SnsBest from './SnsBest.vue'
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
    path: '/franchise',
    name: 'franchise-page',
    component: Franchise
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
    path: '*',
    redirect: '/'
  }
]
