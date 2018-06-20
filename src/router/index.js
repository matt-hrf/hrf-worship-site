import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import SongPost from '@/components/SongPost'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/songs-of-the-week/:id',
      name: 'SongPost',
      component: SongPost
    }
  ]
})
