import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import SongPost from '@/components/SongPost'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/songs-of-the-week/:id',
      name: 'SongPost',
      component: SongPost
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
